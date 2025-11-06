import { compile } from 'sass';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scssPath = resolve(__dirname, '../src/css/index.scss');
const cssPath = resolve(__dirname, '../src/index.css');

try {
  const result = compile(scssPath, {
    style: 'expanded',
    sourceMap: false,
  });
  
  writeFileSync(cssPath, result.css);
  console.log('✅ SCSS compiled to /src/index.css');
} catch (error) {
  console.error('❌ Error compiling SCSS:', error);
  process.exit(1);
}

