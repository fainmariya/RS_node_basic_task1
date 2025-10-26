
//read.js - implement function that reads file fileToRead.txt content 
// using Readable Stream and prints it's content into process.stdout
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';


const fileUrl= new URL('./fileToRead.txt', import.meta.url);
    


    await pipeline(
      createReadStream(fileUrl, { encoding: 'utf8' }),
      process.stdout)
      
  