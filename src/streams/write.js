//write.js - implement function that writes process.stdin data into file fileToWrite.txt
//  content using Writable Stream

import {createWriteStream} from 'node:fs';
import { pipeline } from 'node:stream/promises';



const fileURL = new URL('./fileToWrite.txt', import.meta.url);


await pipeline(
    process.stdin,                   // Readable → ввод из терминала
    createWriteStream(fileURL, {     // Writable → файл (перезапишет)
      flags: 'w',
      encoding: 'utf8'
    })
  );
