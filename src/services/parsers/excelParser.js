import { read, utils } from 'xlsx';

export async function parseExcel(file) {
  const buffer = await file.arrayBuffer();
  const workbook = read(buffer, { type: 'array', cellDates: true });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) throw new Error('No sheets found');

  const raw = utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false });
  if (raw.length < 2) throw new Error('File must contain headers and at least one data row');

  const headers = raw[0].map(h => String(h).trim());
  const rows = raw.slice(1)
    .filter(row => row.some(cell => cell !== ''))
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = (row[i] ?? '').toString());
      return obj;
    });

  return { headers, rows };
}