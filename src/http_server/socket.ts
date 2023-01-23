import { WebSocketServer } from 'ws';
import {
  mouse,
  left,
  right,
  up,
  down,
  getActiveWindow,
} from '@nut-tree/nut-js';

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
        await mouse.move(left(size as number));
        ws.send(command);
        break;
      }
      case 'mouse_up': {
        await mouse.move(up(size as number));
        ws.send(command);
        break;
      }
      case 'mouse_right': {
        await mouse.move(right(size as number));
        ws.send(command);
        break;
      }
      case 'mouse_down': {
        await mouse.move(down(size as number));
        ws.send(command);
        break;
      }
      case 'mouse_position': {
        const pos = await mouse.getPosition();
        const result = `${command} ${pos.x} px,${pos.y} px`;
        console.log(result);
        ws.send(result);
        break;
      }

      case 'draw_circle': {
        const pos = await mouse.getPosition();
        const result = `${command} ${pos.x} px,${pos.y} px`;
        console.log(result);
        ws.send(result);
        break;
      }
    }

    const windowRef = await getActiveWindow();
    const title = await windowRef.title;
    const region = await windowRef.region;
    console.log(title, region);
  });
});
