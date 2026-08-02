import { app, startServer } from './server.ts';

export { app, startServer } from './server.ts';

if (process.env.NODE_ENV !== 'test') {
  void startServer(8000);
}
