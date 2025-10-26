//worker.js - extend given function to work with data received 
// from main thread and implement function which sends result of the computation to the main thread

// src/wt/worker.js
import { parentPort } from 'node:worker_threads';

// 1) Подписываемся: когда main пришлёт сообщение (число n)…
parentPort.on('message', (n) => {
  try {
    // 2) Делаем простую "работу" — возводим в квадрат
    const result = Number(n) * Number(n);

    // 3) Отправляем результат обратно в main
    parentPort.postMessage(result);
  } catch {
    // 4) Если ошибка — шлём null (main поймёт это как 'error')
    parentPort.postMessage(null);
  }
});