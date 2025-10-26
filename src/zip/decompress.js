//decompress.js - implement function that decompresses archive.gz back to the fileToCompress.txt with 
// same content as before compression using zlib and Streams API

import {
    createReadStream,
    createWriteStream,
  } from 'node:fs';
  import {createGunzip } from 'node:zlib';
  import { pipeline } from 'node:stream/promises';
  
  
// const inUrl  = new URL('./archive.gz', import.meta.url);          // входной .gz рядом со скриптом
// const outUrl = new URL('./fileToCompress.txt', import.meta.url);  // файл-результат рядом же

// await pipeline(
//   createReadStream(inUrl), // Readable: сжатый файл
//   createGunzip(),          // Transform: распаковка gzip
//   createWriteStream(outUrl, { flags: 'w' }) // Writable: перезапишет исходный txt
// );
  
  async function do_unzip(input, output) {
    const unzip = createGunzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipeline(source, unzip, destination);
  }
  
  await do_unzip('archive.gz', 'fileToCompress1.txt');