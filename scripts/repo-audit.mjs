#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import process from 'process';
import config from './repo-audit.config.mjs';

const fixMode = process.argv.includes('--fix');
const root = process.cwd();

/** Helper to ensure file exists with content */
function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function get(obj, prop) {
  return prop.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function set(obj, prop, value) {
  let cur = obj;
  for (let i = 0; i < prop.length - 1; i++) {
    const key = prop[i];
    if (typeof cur[key] !== 'object') cur[key] = {};
    cur = cur[key];
  }
  cur[prop[prop.length - 1]] = value;
}

const results = [];

for (const check of config) {
  const filePath = path.join(root, check.path);
  const exists = fs.existsSync(filePath);
  let pass = true;
  let message = 'PASS';

  const record = (p, msg) => {
    results.push({ check: check.id, status: p ? 'PASS' : 'FAIL', info: msg });
  };

  switch (check.type) {
    case 'exists': {
      if (!exists) {
        pass = false;
        message = 'Missing file';
        if (fixMode && check.fix) {
          writeFile(filePath, check.fix);
          pass = fs.existsSync(filePath);
          message = pass ? 'Created' : 'Missing file';
        }
      }
      record(pass, message);
      break;
    }
    case 'dir': {
      if (!(exists && fs.statSync(filePath).isDirectory())) {
        pass = false;
        message = 'Missing directory';
        if (fixMode) {
          fs.mkdirSync(filePath, { recursive: true });
          pass = fs.existsSync(filePath);
          message = pass ? 'Created directory' : 'Missing directory';
        }
      }
      record(pass, message);
      break;
    }
    case 'regex': {
      if (!exists) {
        pass = false;
        message = 'Missing file';
        if (fixMode && check.fix) {
          writeFile(filePath, check.fix);
          pass = check.pattern.test(fs.readFileSync(filePath, 'utf8'));
          message = pass ? 'Created' : 'Pattern missing';
        }
      } else {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!check.pattern.test(content)) {
          pass = false;
          message = 'Pattern missing';
          if (fixMode && check.fix) {
            const newContent = content + (content.endsWith('\n') ? '' : '\n') + check.fix;
            writeFile(filePath, newContent);
            pass = check.pattern.test(fs.readFileSync(filePath, 'utf8'));
            message = pass ? 'Fixed' : 'Pattern missing';
          }
        }
      }
      record(pass, message);
      break;
    }
    case 'notRegex': {
      if (!exists) {
        pass = true;
        message = 'File missing but ok';
      } else {
        const content = fs.readFileSync(filePath, 'utf8');
        if (check.pattern.test(content)) {
          pass = false;
          message = 'Forbidden pattern present';
          if (fixMode && check.fix !== undefined) {
            const newContent = content.replace(check.pattern, check.fix);
            writeFile(filePath, newContent);
            pass = !check.pattern.test(fs.readFileSync(filePath, 'utf8'));
            message = pass ? 'Fixed' : 'Forbidden pattern present';
          }
        }
      }
      record(pass, message);
      break;
    }
    case 'includes': {
      let content = '';
      if (exists) content = fs.readFileSync(filePath, 'utf8');
      const missing = check.lines.filter((l) => !content.includes(l));
      if (missing.length > 0) {
        pass = false;
        message = 'Missing lines: ' + missing.join(', ');
        if (fixMode) {
          let newContent = content;
          missing.forEach((l) => {
            newContent += (newContent.endsWith('\n') ? '' : '\n') + l;
          });
          writeFile(filePath, newContent + '\n');
          const verify = fs.readFileSync(filePath, 'utf8');
          const still = check.lines.filter((l) => !verify.includes(l));
          pass = still.length === 0;
          message = pass ? 'Fixed' : 'Missing lines: ' + still.join(', ');
        }
      }
      record(pass, message);
      break;
    }
    case 'json': {
      if (!exists) {
        pass = false;
        message = 'Missing file';
        if (fixMode && check.fixValue !== undefined) {
          const obj = {};
          set(obj, check.property, check.fixValue);
          writeFile(filePath, JSON.stringify(obj, null, 2) + '\n');
          const val = get(JSON.parse(fs.readFileSync(filePath)), check.property);
          pass = val !== undefined;
          message = pass ? 'Created' : 'Missing file';
        }
      } else {
        const data = JSON.parse(fs.readFileSync(filePath));
        const value = get(data, check.property);
        if (value === undefined || (check.pattern && !(new RegExp(check.pattern).test(String(value))))) {
          pass = false;
          message = 'Property missing or value mismatch';
          if (fixMode && check.fixValue !== undefined) {
            set(data, check.property, check.fixValue);
            writeFile(filePath, JSON.stringify(data, null, 2) + '\n');
            const v2 = get(JSON.parse(fs.readFileSync(filePath)), check.property);
            pass = v2 !== undefined && (!check.pattern || new RegExp(check.pattern).test(String(v2)));
            message = pass ? 'Fixed' : 'Property missing or value mismatch';
          }
        }
      }
      record(pass, message);
      break;
    }
    case 'jsonNot': {
      if (exists) {
        const data = JSON.parse(fs.readFileSync(filePath));
        const value = get(data, check.property);
        if (value !== undefined) {
          pass = false;
          message = 'Property should not exist';
          if (fixMode) {
            let obj = data;
            for (let i = 0; i < check.property.length - 1; i++) {
              if (!obj) break;
              obj = obj[check.property[i]];
            }
            if (obj) {
              delete obj[check.property[check.property.length - 1]];
              writeFile(filePath, JSON.stringify(data, null, 2) + '\n');
              const v2 = get(JSON.parse(fs.readFileSync(filePath)), check.property);
              pass = v2 === undefined;
              message = pass ? 'Removed' : 'Property should not exist';
            }
          }
        }
      }
      record(pass, message);
      break;
    }
    default: {
      record(false, 'Unknown check type');
    }
  }
}

console.table(results);
const failed = results.filter((r) => r.status === 'FAIL');
if (failed.length > 0) {
  process.exit(1);
}
