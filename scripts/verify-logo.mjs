import { createHash } from 'crypto';
import { readFileSync } from 'fs';

const filePath = 'apps/web/components/BrandLogo.tsx';
const expectedHash = '90d4b9b5edce049f808f08efe668b7d606bde20b928ee14a7e63d7e49e777c1e';

const fileBuffer = readFileSync(filePath);
const hashSum = createHash('sha256');
hashSum.update(fileBuffer);
const actualHash = hashSum.digest('hex');

if (actualHash !== expectedHash) {
  console.error(`Logo file ${filePath} has been modified. Please revert the changes.`);
  process.exit(1);
}
