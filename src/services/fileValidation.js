const ONE_MB = 1024 * 1024;
const MAX_SIZE = 10 * ONE_MB;

const MAGIC_BYTES = {
  xlsx: [0x50, 0x4B, 0x03, 0x04],
  xls:  [0xD0, 0xCF, 0x11, 0xE0],
  pdf:  [0x25, 0x50, 0x44, 0x46],
};

export async function validateFile(file) {
  if (file.size > MAX_SIZE) {
    throw new Error(`File size must be under ${MAX_SIZE / ONE_MB} MB`);
  }

  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!ext) throw new Error('File has no extension');

  // CSV: no magic bytes, we check for delimiters
  if (ext === 'csv') {
    const sample = await file.slice(0, 2000).text();
    if (!/[,\t;]/.test(sample)) {
      throw new Error('CSV file does not contain any recognised delimiters');
    }
    return;
  }

  const magic = MAGIC_BYTES[ext];
  if (!magic) throw new Error(`Unsupported file type: .${ext}`);

  const buffer = await file.slice(0, magic.length).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const isValid = magic.every((byte, i) => bytes[i] === byte);
  if (!isValid) throw new Error(`File is not a valid .${ext} document`);
}