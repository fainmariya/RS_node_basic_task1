import { readdir } from 'node:fs/promises';


export async function list() {
  const path = new URL('./files', import.meta.url);
  try {
    const entries = await readdir(path, {encoding:'utf8', withFileTypes:false, recursive:false});
    console.log(entries);                 
    return entries;       
  } catch {
    throw new Error('FS operation failed');
  }
}


// (опционально — для ручного запуска)
if (import.meta.url === `file://${process.argv[1]}`) {
  list().catch(e => {
    console.error(e.message);
    process.exit(1);
  });
}