import { rename } from 'node:fs/promises';

export async function create() {
  const oldPath = new URL('./files/wrongFilename.txt', import.meta.url);
  const newPath = new URL('./files/properFilename.md', import.meta.url);
  try {
    await rename(oldPath, newPath);
  } catch {
    throw new Error('FS operation failed');
  }
}


// (опционально — для ручного запуска)
if (import.meta.url === `file://${process.argv[1]}`) {
  create().catch(e => {
    console.error(e.message);
    process.exit(1);
  });
}