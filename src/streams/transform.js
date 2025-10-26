//transform.js - implement function that reads data from process.stdin, 
// reverses text using Transform Stream and then writes it into process.stdout
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const reverseChunk = new Transform({
  // На каждый пришедший кусок (Buffer)…
  transform(chunk, _enc, cb) {
    const s = chunk.toString();                 // 1) переводим байты → строку (UTF-8 по умолчанию)
    const reversed = s.split('').reverse().join(''); // 2) наивно разворачиваем символы
    cb(null, reversed);                         // 3) отдаём результат дальше в трубопровод
  }
});

await pipeline(
  process.stdin,    // читаем из стандартного ввода
  reverseChunk,     // разворачиваем каждый chunk
  process.stdout    // пишем в стандартный вывод
);