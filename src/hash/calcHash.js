
import { createReadStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';



    const pathFile = new URL('./fileToCalculateHashFor.txt', import.meta.url);
    
    const hash = createHash('sha256');
    hash.setEncoding('hex');

    await pipeline(
        createReadStream(pathFile),
        hash,
        createWriteStream(pathFile),
      );
      console.log('Pipeline succeeded.');