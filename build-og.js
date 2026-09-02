// Renders og-card.html to og.png, the social preview image.
// Captures at 4x and downsamples to 1800x945, so text stays sharp after the
// supersample and previews still look crisp on high-density screens.
// Usage: node build-og.js

const { execFileSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const CHROME = process.env.CHROME
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const card = path.join(__dirname, 'og-card.html');
const out = path.join(__dirname, 'og.png');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));
const retina = path.join(tmp, 'og-4x.png');

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=4',
  '--window-size=1200,630',
  '--virtual-time-budget=3000',
  '--no-first-run',
  '--no-default-browser-check',
  `--screenshot=${retina}`,
  `file://${card}`,
], { stdio: 'ignore', timeout: 60000 });

execFileSync('sips', ['-Z', '1800', retina, '--out', out], { stdio: 'ignore' });
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`Wrote ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
