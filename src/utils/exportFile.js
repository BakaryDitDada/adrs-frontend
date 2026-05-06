import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportPDF = (tableData, filename) => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [Object.keys(tableData[0])],
    body: tableData.map(row => Object.values(row)),
  });

  doc.save(`${filename}.pdf`);
};

export const exportExcel = (tableData, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(tableData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

