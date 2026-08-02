import { startServer } from "./server.js";
export { app, startServer } from "./server.js";
if (process.env.NODE_ENV !== 'test') {
    void startServer(8000);
}
