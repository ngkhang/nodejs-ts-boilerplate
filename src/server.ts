import http from 'http';

import envConfig from '@/config/env.config';

import app from './app';

const { port, host } = envConfig.app;
const server = http.createServer(app);

server.listen(port, host, () => {
  console.info(`Server is running on http://${host}:${port}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.info('Server closed');
    process.exit(0);
  });
});

export default server;
