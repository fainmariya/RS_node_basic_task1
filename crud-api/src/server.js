
import http from 'node:http';
import { PORT } from './config/env.js';
import { router } from './router/index.js';

const server = http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (err) {
    console.error('Unhandled error:', err);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { server };
