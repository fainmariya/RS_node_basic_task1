import {unlink } from 'node:fs/promises';


export async function removeFile() {
  const path = new URL('./files/fileToRemove.txt', import.meta.url);
  try {
    await unlink(path);
  } catch {
    throw new Error('FS operation failed');
  }
}


