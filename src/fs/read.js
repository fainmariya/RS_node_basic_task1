import { readFile } from 'node:fs/promises';


export async function read() {
  const path = new URL('./files/fileToRead.txt', import.meta.url);
  try {
    const content = await readFile(path, {encoding:'utf8', flag:'r'});
    console.log(content);                 
         
  } catch {
    throw new Error('FS operation failed');
  }
}


// (опционально — для ручного запуска)
if (import.meta.url === `file://${process.argv[1]}`) {
  read().catch(e => {
    console.error(e.message);
    process.exit(1);
  });
}