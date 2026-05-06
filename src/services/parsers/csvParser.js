import Papa from 'papaparse';

export function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,   // keep strings
      complete: ({ data, errors, meta }) => {
        if (errors.length) reject(new Error(`CSV error: ${errors[0].message}`));
        const rows = data.filter(row => Object.values(row).some(v => v !== '' && v != null));
        resolve({ headers: meta.fields || [], rows });
      },
      error: (err) => reject(err),
    });
  });
}