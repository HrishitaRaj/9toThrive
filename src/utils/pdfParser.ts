import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface ParsedStudent {
  name: string;
  email: string;
  branch: string;
  rollNo: string;
  skills?: string[];
}

export async function parsePDF(file: File): Promise<ParsedStudent[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  
  // Extract text from all pages
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }
  
  return parseStudentData(fullText);
}

function parseStudentData(text: string): ParsedStudent[] {
  const students: ParsedStudent[] = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  // Pattern matching for student data
  // Assumes format: Name | Email | Branch | Roll No | Skills (optional)
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for email pattern to identify student records
    if (emailRegex.test(line)) {
      const parts = line.split(/[|,\t]/).map(p => p.trim());
      
      if (parts.length >= 4) {
        const student: ParsedStudent = {
          name: parts[0] || `Student ${i + 1}`,
          email: parts.find(p => emailRegex.test(p)) || '',
          branch: parts[2] || 'Computer Science',
          rollNo: parts[3] || `R${Date.now()}${i}`,
          skills: parts.slice(4).filter(s => s.length > 0)
        };
        
        if (student.email) {
          students.push(student);
        }
      }
    }
  }
  
  return students;
}
