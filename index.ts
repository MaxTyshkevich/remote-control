import { httpServer } from './src/http_server/index.js';
import { wss } from './src/http_server/websocket/socket.js';

const HTTP_PORT = 8181;
wss;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
