import { access, readFile } from 'node:fs/promises';

const required = [
  'index.html',
  'src/app.js',
  'src/styles.css',
  'assets/doll-sample-1.png',
  'design_references/homepage-concept.png',
];

for (const path of required) {
  await access(path);
}

const html = await readFile('index.html', 'utf8');
const js = await readFile('src/app.js', 'utf8');
const css = await readFile('src/styles.css', 'utf8');

const checks = [
  ['hero headline', html.includes('A brave friend for every child.')],
  ['waitlist form', html.includes('maitriWaitlistForm')],
  ['survey fields', html.includes('storyPreference') && html.includes('preorderSignal')],
  ['local report tools', html.includes('downloadReport') && js.includes('buildLocalReport')],
  ['interactive state', js.includes('localStorage') && js.includes('renderWaitlistState')],
  ['responsive rules', css.includes('@media (max-width: 900px)')],
  ['reduced motion', css.includes('prefers-reduced-motion')],
];

const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('Failed checks:', failed.map(([name]) => name).join(', '));
  process.exit(1);
}

console.log('Website checks passed.');
