//cp.js - implement function spawnChildProcess that receives array of arguments args and creates child process from file script.js, passing these args to it. This function should create IPC-channel between stdin and stdout of master process and child process:
// child process stdin should receive input from master process stdin
// child process stdout should send data to master process stdout

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptURL = new URL('./script.js', import.meta.url)
const scriptPath = fileURLToPath(scriptURL)
export function spawnChildProcess(args = []){
    const child = spawn(process.execPath, [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'], 
        // stdin ребёнка (0) — pipe, stdout (1) — pipe, stderr (2) — напрямую в stderr родителя
      });
    
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
    return child;

    
}
if (import.meta.url === `file://${process.argv[1]}`) {
    const [, , ...cliArgs] = process.argv;
    spawnChildProcess(cliArgs);
  }
  
 