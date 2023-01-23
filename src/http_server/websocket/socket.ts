import { WebSocketServer } from 'ws';
/* import { mouse, left, right, up, down } from '@nut-tree/nut-js'; */
import {
  mouse,
  left,
  right,
  up,
  down,
  straightTo,
  Point,
  Button,
} from '@nut-tree/nut-js';
import { webSocketParser } from './parser';
import { drawSquare } from './draw_square';
import { drawRectangle } from './draw_rectangle';
const WS_PORT = 8080;
console.log('arr');

export const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', function connection(ws) {
  console.log(`wss turn on `);

  ws.on('message', async function message(data) {
    console.log('received: %s', data);

    const [command, size, figLength] = webSocketParser(data);

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
        const string = `${command}{${pos.x}px},{${pos.y}px}`;
        ws.send(string);
        break;
      }

      case 'draw_circle': {
        const pos = await mouse.getPosition();

        for (let i = 0; i < 360; i++) {
          let rad = (i / 180) * Math.PI;
          let x = pos.x + size * Math.cos(rad);
          let y = pos.y + size * Math.sin(rad);
          const point = new Point(x, y);
          if (i === 1) {
            await mouse.pressButton(Button.LEFT);
          }

          await mouse.move(straightTo(point));
        }
        await mouse.releaseButton(Button.LEFT);
        ws.send(command);
        break;
      }

      case 'draw_square': {
        await drawSquare(size);
        ws.send(command);
        break;
      }

      case 'draw_rectangle': {
        await drawRectangle(size, figLength);
        ws.send(command);
        break;
      }
    }
  });
});
