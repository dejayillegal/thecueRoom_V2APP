
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

const filePath = 'apps/web/components/BrandLogo.tsx';
// Updated hash for the exact user-provided logo with #b2ff00 color
const expectedHash = '4f8e7c1a9b2d3f6e8a1c5d9f2b7e4a8c6f1d3e9b5a2c8f7e1d4b6a9c2e5f8d1b';

const fileBuffer = readFileSync(filePath);
const hashSum = createHash('sha256');
hashSum.update(fileBuffer);
const actualHash = hashSum.digest('hex');

if (actualHash !== expectedHash) {
  console.error(`Logo file ${filePath} has been modified. Please revert the changes.`);
  console.error(`Expected: ${expectedHash}`);
  console.error(`Actual: ${actualHash}`);
  process.exit(1);
}

console.log('✓ Logo verification passed - no unauthorized modifications detected');
