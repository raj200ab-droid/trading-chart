import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const out = resolve(root, 'www');
const files = [
  'index.html', 'app.js', 'features.js', 'enhancements.js', 'scanner.js', 'live.js', 'sw.js',
  'manifest.json', 'icon.svg', 'styles.css', 'premium.css', 'mobile.css',
  'rsi.css', 'tools.css', 'advanced.css', 'paper.css', 'reliability.css',
  'calibration.css', 'shortlist.css'
];
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of files) await cp(resolve(root, file), resolve(out, file));
console.log(`Prepared ${files.length} Flowstate web assets in www/`);
