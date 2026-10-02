import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.resolve(__dirname, '../src/data/seoLandingPages.ts');

if (!fs.existsSync(targetFile)) {
  console.error(`Target file not found: ${targetFile}`);
  process.exit(1);
}

let content = fs.readFileSync(targetFile, 'utf-8');

if (content.includes('ssc-photo-resizer')) {
  console.log('Exam pages are already present in seoLandingPages.ts!');
  process.exit(0);
}

const pyFile = path.resolve(__dirname, 'add_exam_pages.py');
const pyContent = fs.readFileSync(pyFile, 'utf-8');

const match = pyContent.match(/NEW_EXAM_PAGES = '''([\s\S]*?)'''/);
if (!match) {
  console.error('Could not extract NEW_EXAM_PAGES from pyFile');
  process.exit(1);
}

const newPagesCode = match[1];

const regex = /\];\s*(export const SEO_LANDING_PAGE_MAP)/;
if (!regex.test(content)) {
  console.error('Could not find closing bracket regex in seoLandingPages.ts');
  process.exit(1);
}

content = content.replace(regex, ',\n\n' + newPagesCode + '];\n\n$1');
fs.writeFileSync(targetFile, content, 'utf-8');

console.log('Successfully added Top Indian Exam Programmatic Pages into seoLandingPages.ts!');
