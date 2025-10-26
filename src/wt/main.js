// main.js - implement function that creates number of worker threads (equal to the number of host machine logical CPU cores) from file worker.js and able to send data to those threads and to receive result of the computation from them. You should send incremental number starting from 10 to each worker. For example: on host machine with 4 cores you should create 4 workers and send 10 to first worker, 11 to second worker, 12 to third worker, 13 to fourth worker. After all workers will finish, function should log array of results into console. The results are array of objects with 2 properties:
// status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
// data - value from worker in case of success or null in case of error in worker
// The results in the array must be in the same order that the workers were created

import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';

const numWorkers = cpus().length;                 // 1) сколько логических ядер → столько воркеров
const workerUrl = new URL('./worker.js', import.meta.url); // 2) путь к файлу воркера

// 3) Функция: запустить один воркер, отправить число n, вернуть промис с { status, data }
function runOneWorker(n) {
  return new Promise((resolve) => {
    const worker = new Worker(workerUrl);         // создаём воркер (он загрузит worker.js)
    let settled = false;

    // 4) Ждём ответ от воркера (успех)
    worker.once('message', (value) => {
      settled = true;
      resolve({ status: value === null ? 'error' : 'resolved', data: value ?? null });
      worker.terminate().catch(() => {});         // закрываем воркер (чисто)
    });

    // 5) Если внутри воркера случилась ошибка
    worker.once('error', () => {
      if (!settled) {
        settled = true;
        resolve({ status: 'error', data: null });
      }
    });

    // 6) Если воркер завершился с ошибкой до ответа
    worker.once('exit', (code) => {
      if (!settled && code !== 0) {
        settled = true;
        resolve({ status: 'error', data: null });
      }
    });

    // 7) Отправляем наш инкрементальный номер (n) в воркер
    worker.postMessage(n);
  });
}

// 8) Формируем числа: 10, 11, 12, ...
const tasks = Array.from({ length: numWorkers }, (_, i) => 10 + i);

// 9) Запускаем столько воркеров, сколько ядер, каждому своё число
const promises = tasks.map((n) => runOneWorker(n));

// 10) Ждём, когда все закончат, и печатаем массив результатов
const results = await Promise.all(promises);
console.log(results);