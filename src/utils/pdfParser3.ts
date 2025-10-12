// Minimal PDF text extractor wrapper using pdfjs-dist (this is a simplified helper used in dev)
import fs from 'fs';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

export async function extractTextFromPdf(path: string): Promise<string> {
  const data = new Uint8Array(fs.readFileSync(path));
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(' ');
    text += pageText + '\n';
  }
  return text;
}
