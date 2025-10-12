// Simple resume parser that extracts email, phone, and known skills from a plain-text resume
const SKILLS = [
  'react.js','javascript','node.js','git','html/css','python','typescript','next.js','mongodb','responsive design','redux','rest apis','tailwindcss','sql'
];

export function extractBasicResumeInfo(text: string) {
  const lower = text.toLowerCase();
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+?\d[\d -]{7,}\d)/);
  const skills = SKILLS.filter(s => lower.includes(s));
  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    skills
  };
}
