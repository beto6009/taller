// script.js

async function generarPDF(){

  const { jsPDF } = window.jspdf;

  const area = document.getElementById("orden");

  const canvas = await html2canvas(area, {
    scale:2
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = 210;
  const pdfHeight = 297;

  pdf.addImage(
    imgData,
    'PNG',
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save("orden_servicio.pdf");
}