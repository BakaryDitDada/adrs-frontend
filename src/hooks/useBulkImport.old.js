import { useState, useCallback, useRef, useEffect } from 'react';
import { validateFile } from '@/services/fileValidation';
import { autoMapHeaders } from '@/utils/columnMapper';
import { validateRows } from '@/utils/validationRunner';

const WORKER_URL = new URL('../services/parsers/worker.js', import.meta.url);
const STEPS = ['UPLOAD', 'MAPPING', 'VALIDATION', 'IMPORTING', 'DONE'];

export function useBulkImport({ onClose, onImport }) {
  const [file, setFile] = useState(null);
  const [parsedResult, setParsedResult] = useState(null);  // { headers, rows, rawText, heuristicFail }
  const [mapping, setMapping] = useState({});
  const [validatedRows, setValidatedRows] = useState([]);
  const [step, setStep] = useState('UPLOAD');
  const [error, setError] = useState(null);
  const [importing, setImporting] = useState(false);
  const workerRef = useRef(null);

  // Reset everything when modal closes
  const reset = useCallback(() => {
    setFile(null);
    setParsedResult(null);
    setMapping({});
    setValidatedRows([]);
    setStep('UPLOAD');
    setError(null);
    setImporting(false);
    if (workerRef.current) workerRef.current.terminate();
  }, []);

  // File drop handler
  const handleFileDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    try {
      await validateFile(selectedFile);
      setFile(selectedFile);
      setStep('UPLOAD'); // show loading inside dropzone

      // Run parser in Web Worker
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      const type = ext === 'xls' ? 'xls' : ext; // normalise .xls and .xlsx

      // Create a new worker each time (or reuse)
      if (workerRef.current) workerRef.current.terminate();
      const worker = new Worker(WORKER_URL);
      workerRef.current = worker;

      worker.postMessage({ file: selectedFile, type });

      worker.onmessage = (e) => {
        const { success, data, error: workerError } = e.data;
        if (!success) {
          setError(workerError);
          setStep('UPLOAD');
          return;
        }

        const parsed = data;
        setParsedResult(parsed);

        if (parsed.heuristicFail) {
          // PDF heuristics failed – go to manual text editor
          setStep('MANUAL_TEXT'); // custom step, we'll handle it
        } else {
          // Auto‑map headers
          const autoMap = autoMapHeaders(parsed.headers);
          setMapping(autoMap);
          // Validate rows
          const withErrors = validateRows(parsed.rows, autoMap);
          setValidatedRows(withErrors);
          setStep('VALIDATION'); // could go straight to validation, or show mapping first
          // We'll let the user see mapping by default
          setStep('MAPPING');
        }
      };

      worker.onerror = (err) => {
        setError('Worker error: ' + err.message);
        setStep('UPLOAD');
      };

    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Update mapping and re‑validate
  const updateMapping = useCallback((newMapping) => {
    setMapping(newMapping);
    if (parsedResult?.rows) {
      const revalidated = validateRows(parsedResult.rows, newMapping);
      setValidatedRows(revalidated);
    }
  }, [parsedResult]);

  // Manual text parsing (when PDF heuristic fails)
  const handleManualText = useCallback((text) => {
    // You can run the same heuristic again or let user paste CSV/TSV
    // For simplicity, we'll treat the text as CSV (comma, tab or semicolon)
    try {
      const lines = text.split('\n').filter(Boolean);
      const headers = lines[0].split(/[,\t;]/).map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const cells = line.split(/[,\t;]/);
        const obj = {};
        headers.forEach((h, i) => obj[h] = cells[i]?.trim() || '');
        return obj;
      });

      const parsed = { headers, rows, rawText: text };
      setParsedResult(parsed);
      const autoMap = autoMapHeaders(headers);
      setMapping(autoMap);
      const withErrors = validateRows(rows, autoMap);
      setValidatedRows(withErrors);
      setStep('MAPPING');
      setError(null);
    } catch (err) {
      setError('Could not parse the provided text: ' + err.message);
    }
  }, []);

  // Import action
  const handleImport = useCallback(async () => {
    const validRows = validatedRows.filter(r => !r.errors).map(r => r.data);
    if (validRows.length === 0) {
      setError('No valid records to import. Fix the errors first.');
      return;
    }

    setImporting(true);
    setStep('IMPORTING');
    try {
      await onImport(validRows);   // this calls your backend endpoint
      setStep('DONE');
      setTimeout(() => {
        onClose?.();
        reset();
      }, 1500); // show success briefly
    } catch (err) {
      setError(err.message || 'Import failed');
      setStep('VALIDATION'); // go back to review
    } finally {
      setImporting(false);
    }
  }, [validatedRows, onImport, onClose, reset]);

  // Computed stats
  const validCount = validatedRows.filter(r => !r.errors).length;
  const errorCount = validatedRows.length - validCount;

  return {
    // State
    file,
    parsedResult,
    mapping,
    validatedRows,
    step,
    error,
    importing,
    validCount,
    errorCount,
    // Actions
    handleFileDrop,
    updateMapping,
    handleManualText,
    handleImport,
    setStep,
    setError,
    reset,
  };
}