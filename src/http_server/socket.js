import { WebSocketServer } from 'ws';
import { mouse, left, right, up, down } from '@nut-tree/nut-js';

const WS_PORT = 8080;

export const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', function connection(ws) {
  console.log(`wss turn on `);

  ws.on('message', async function message(data) {
    console.log('received: %s', data);
    const [command, size, figLength] = data
      .toString()
      .split(' ')
      .map((item, index) => (index ? Number(item) : item));

    switch (command) {
      case 'mouse_left': {
        await mouse.move(left(size));
        ws.send(command);
        break;
      }
      case 'mouse_up': {
        await mouse.move(up(size));
        ws.send(command);
        break;
      }
      case 'mouse_right': {
        await mouse.move(right(size));
        ws.send(command);
        break;
      }
      case 'mouse_down': {
        await mouse.move(down(size));
        ws.send(command);
        break;
      }
      case 'mouse_position': {
        const pos = await mouse.getPosition();
        const posString = pos.toString();

        console.log(`${command}: x:${x}, y:${y}`);
        ws.send(`${command}: x:${x}, y:${y}`);
        break;
      }
    }
  });
});
