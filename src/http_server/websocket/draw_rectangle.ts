import { mouse, left, right, up, down, Button } from '@nut-tree/nut-js';

export const drawRectangle = async (size: number, figLength: number) => {
  await mouse.pressButton(Button.LEFT);

  await mouse.move(right(size));
  await mouse.move(down(figLength));
  await mouse.move(left(size));
  await mouse.move(up(figLength));

  await mouse.releaseButton(Button.LEFT);

  return;
};
