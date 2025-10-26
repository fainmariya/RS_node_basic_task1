//compress.js - implement function that compresses 
// file fileToCompress.txt to archive.gz using zlib and Streams API

import {
    createReadStream,
    createWriteStream,
  } from 'node:fs';
  import { createGzip } from 'node:zlib';
  import { pipeline } from 'node:stream/promises';
  
  async function do_gzip(input, output) {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipeline(source, gzip, destination);
  }
  
  await do_gzip('fileToCompress.txt', 'archive.gz');