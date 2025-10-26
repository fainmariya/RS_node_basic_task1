
const path = require('node:path');

function readSomething(input = '.index.md') {
    console.log(path.extname(input));
  }
  
  module.exports = { readSomething };
  
  // Автозапуск при прямом запуске файла
  if (require.main === module) {
    const arg = process.argv[2] ?? '.index.md';
    readSomething(arg);
  }