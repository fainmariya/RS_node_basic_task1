import { cp } from 'node:fs/promises';

export async function copy() {
    const sourcePath = new URL('./files', import.meta.url);
    const destPath = new URL('./files_copy', import.meta.url);
      try {
        await cp(sourcePath, destPath, {
            recursive: true,
            force: false,        // не перезаписывать существующее
            errorOnExist: true,  // упасть, если files_copy уже есть
          });
        
        console.log('data from files was copied to files_copy');;
      } catch {
        throw new Error('FS operation failed');
      }
    }
    
    if (import.meta.url === `file://${process.argv[1]}`) {
        copy().then(() => console.log('OK')).catch(e => console.error(e.message));
      }
    
