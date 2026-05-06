import { PDFParse } from 'pdf-parse';

export async function parsePDF(file) {
  if (!file) {
    return {
      headers: [],
      rows: [],
      rawText: '',
      heuristicFail: true,
      error: 'No file provided',
    };
  }

  try {
    // const buffer = Buffer.from(await file.arrayBuffer());
    const data = new PDFParse(Buffer.from(await file.arrayBuffer()));
    // const parser = Buffer.from(await file.arrayBuffer());
    // const data = await pdf(buffer);

    const text = (data?.text || '').trim();
    if (!text) {
      return {
        headers: [],
        rows: [],
        rawText: '',
        heuristicFail: true,
      };
    }

    const lines = text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      // remove page separators and noise
      .filter(line => line !== '\f');

    if (lines.length < 2) {
      return {
        headers: [],
        rows: [],
        rawText: text,
        heuristicFail: true,
      };
    }

    // Split by 2+ spaces or tabs
    const splitter = /\s{2,}|\t/;
    const splitLines = lines.map(line =>
      line.split(splitter).map(cell => cell.trim()).filter(Boolean)
    );

    // Find the most table-like line:
    // Prefer rows with at least 2 columns and the highest column count.
    const candidates = splitLines
      .map((cols, index) => ({ cols, index }))
      .filter(item => item.cols.length >= 2);

    if (candidates.length === 0) {
      return {
        headers: [],
        rows: [],
        rawText: text,
        heuristicFail: true,
      };
    }

    const headerCandidate = candidates.reduce((best, current) =>
      current.cols.length > best.cols.length ? current : best
    );

    const headers = headerCandidate.cols.map(h =>
      h.replace(/[^\w\s-]/g, '').trim()
    );

    if (headers.length < 2) {
      return {
        headers: [],
        rows: [],
        rawText: text,
        heuristicFail: true,
      };
    }

    const rows = splitLines
      .slice(headerCandidate.index + 1)
      .map(cols => {
        // Allow slightly irregular rows
        if (cols.length < 2) return null;

        const obj = {};
        headers.forEach((h, i) => {
          obj[h || `column_${i + 1}`] = cols[i] ?? '';
        });
        return obj;
      })
      .filter(Boolean);

    return {
      headers,
      rows,
      rawText: text,
      heuristicFail: rows.length === 0,
    };
  } catch (error) {
    return {
      headers: [],
      rows: [],
      rawText: '',
      heuristicFail: true,
      error: error instanceof Error ? error.message : 'Unknown PDF parsing error',
    };
  }
}

// import { PDFParse  } from 'pdf-parse';

// export async function parsePDF(file) {
//   const buffer = await file.arrayBuffer();
//   const data = await new PDFParse (Buffer.from(buffer));
//   const text = data?.text;

//   const lines = text?.split('\n')?.map(l => l.trim())?.filter(Boolean);
//   if (lines?.length < 2) return { headers: [], rows: [], rawText: text, heuristicFail: true };

//   // Try splitting by 2+ spaces or tabs – most common in PDF tables
//   const splitter = /\s{2,}|\t/;
//   const splitLines = lines.map(line => line.split(splitter).filter(Boolean));

//   // Find the line with the highest number of columns – likely the header
//   const maxCols = Math.max(...splitLines.map(cols => cols.length));
//   if (maxCols < 2) return { headers: [], rows: [], rawText: text, heuristicFail: true };

//   const headerIndex = splitLines.findIndex(cols => cols.length === maxCols);
//   if (headerIndex === -1) return { headers: [], rows: [], rawText: text, heuristicFail: true };

//   const headers = splitLines[headerIndex].map(h => h.replace(/[^a-zA-Z0-9\s]/g, '').trim());
//   const rows = splitLines
//     .slice(headerIndex + 1)
//     .filter(cols => cols.length === maxCols)   // keep only aligned rows
//     .map(cols => {
//       const obj = {};
//       headers.forEach((h, i) => obj[h] = cols[i] || '');
//       return obj;
//     });

//   return {
//     headers,
//     rows,
//     rawText: text,
//     heuristicFail: rows.length === 0,
//   };
// }