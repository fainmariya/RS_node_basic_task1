
import path from 'node:path';

export function readSomething(input = '.index.md') {
    console.log(path.extname(input));
  }
  


  if (import.meta.url === `file://${process.argv[1]}`) {
    const arg = process.argv[2] ?? '.index.md';
    readSomething(arg);
  }
