import { useState, useCallback, useRef } from 'react';
import { validateFile } from '@/services/fileValidation';
import { autoMapHeaders } from '@/utils/columnMapper';
import { validateRows } from '@/utils/validationRunner';

const WORKER_URL = new URL('../services/parsers/worker.js', import.meta.url);

export const STEPS = {
  UPLOAD: 'UPLOAD',
  MANUAL_TEXT: 'MANUAL_TEXT',
  MAPPING: 'MAPPING',
  VALIDATION: 'VALIDATION',
  IMPORTING: 'IMPORTING',
  DONE: 'DONE',
};

export function useBulkImport({ onClose, onImport, schema, leafFields }) {
  const [file, setFile] = useState(null);
  const [parsedResult, setParsedResult] = useState(null); // { headers, rows, rawText, heuristicFail }
  const [mapping, setMapping] = useState({});
  const [validatedRows, setValidatedRows] = useState([]);
  const [step, setStep] = useState(STEPS.UPLOAD);
  const [error, setError] = useState(null);
  const [importing, setImporting] = useState(false);
  const workerRef = useRef(null);

  /** Reset everything when modal closes */
  const reset = useCallback(() => {
    setFile(null);
    setParsedResult(null);
    setMapping({});
    setValidatedRows([]);
    setStep(STEPS.UPLOAD);
    setError(null);
    setImporting(false);
    if (workerRef.current) workerRef.current.terminate();
  }, []);

  /** File drop handler */
  const handleFileDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    try {
      await validateFile(selectedFile);
      setFile(selectedFile);
      setStep(STEPS.UPLOAD);

      // Worker lifecycle
      if (workerRef.current) workerRef.current.terminate();
      const worker = new Worker(WORKER_URL);
      workerRef.current = worker;

      const ext = selectedFile.name.split('.').pop().toLowerCase();
      const type = ext === 'xls' ? 'xls' : ext;

      worker.postMessage({ file: selectedFile, type });

      worker.onmessage = (e) => {
        const { success, data, error: workerError } = e.data;
        if (!success) {
          setError(workerError);
          setStep(STEPS.UPLOAD);
          return;
        }

        const parsed = data;
        setParsedResult(parsed);

        if (parsed.heuristicFail) {
          setStep(STEPS.MANUAL_TEXT);
        } else {
          const autoMap = autoMapHeaders(parsed.headers, leafFields);
          setMapping(autoMap);
          const withErrors = validateRows(parsed.rows, autoMap, schema);
          setValidatedRows(withErrors);
          setStep(STEPS.MAPPING);
        }
      };

      worker.onerror = (err) => {
        setError('Worker error: ' + err.message);
        setStep(STEPS.UPLOAD);
      };
    } catch (err) {
      setError(err.message);
    }
  }, [schema, leafFields]);

  /** Update mapping and re‑validate */
  const updateMapping = useCallback((newMapping) => {
    setMapping(newMapping);
    if (parsedResult?.rows) {
      const revalidated = validateRows(parsedResult.rows, newMapping, schema);
      setValidatedRows(revalidated);
    }
  }, [parsedResult, schema]);

  /** Manual text parsing (fallback for PDF) */
  const handleManualText = useCallback((text) => {
    try {
      const lines = text.split('\n').filter(Boolean);
      const headers = lines[0].split(/[,\t;]/).map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const cells = line.split(/[,\t;]/);
        return headers.reduce((obj, h, i) => {
          obj[h] = cells[i]?.trim() || '';
          return obj;
        }, {});
      });

      const parsed = { headers, rows, rawText: text };
      setParsedResult(parsed);

      const autoMap = autoMapHeaders(headers, leafFields);
      setMapping(autoMap);

      const withErrors = validateRows(rows, autoMap, schema);
      setValidatedRows(withErrors);

      setStep(STEPS.MAPPING);
      setError(null);
    } catch (err) {
      setError('Could not parse the provided text: ' + err.message);
    }
  }, [schema]);

  /** Import action */
  const handleImport = useCallback(async () => {
    const validRows = validatedRows.filter(r => !r.errors).map(r => r.data);
    if (validRows.length === 0) {
      setError('No valid records to import. Fix the errors first.');
      return;
    }

    setImporting(true);
    setStep(STEPS.IMPORTING);
    try {
      // return console.log("Valid Rows (handleImport) :::", validRows, " --------");
      await onImport(validRows).unwrap();
      setStep(STEPS.DONE);
      setTimeout(() => {
        onClose?.();
        reset();
      }, 1500);
    } catch (err) {
      console.log("Import Error::: ", err);
      setError(err.message || 'Import failed');
      setStep(STEPS.VALIDATION);
    } finally {
      setImporting(false);
    }
  }, [validatedRows, onImport, onClose, reset]);

  /** Computed stats */
  const validCount = validatedRows.filter(r => !r.errors).length;
  const errorCount = validatedRows.length - validCount;

  return {
    file,
    parsedResult,
    mapping,
    validatedRows,
    step,
    error,
    importing,
    validCount,
    errorCount,
    handleFileDrop,
    updateMapping,
    handleManualText,
    handleImport,
    setStep,
    setError,
    reset,
  };
}