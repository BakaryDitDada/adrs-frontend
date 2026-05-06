import { parseCSV } from './csvParser';
import { parseExcel } from './excelParser';
import { parsePDF } from './pdfParser';

self.onmessage = async (e) => {
  const { file, type } = e.data;
  try {
    let result;
    switch (type) {
      case 'csv': result = await parseCSV(file); break;
      case 'xlsx':
      case 'xls': result = await parseExcel(file); break;
      case 'pdf': result = await parsePDF(file); break;
      default: throw new Error(`Unsupported type: ${type}`);
    }
    self.postMessage({ success: true, data: result });
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
};