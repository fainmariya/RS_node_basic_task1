import { writeFile } from 'node:fs/promises';

export async function create() {
  const fileUrl = new URL('./files/fresh.txt', import.meta.url);
  try {
    await writeFile(fileUrl, 'I am fresh and young', { flag: 'wx' });
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