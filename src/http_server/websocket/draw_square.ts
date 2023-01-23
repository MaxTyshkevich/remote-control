import { mouse, straightTo, Point, Button } from '@nut-tree/nut-js';

export const drawSquare = async (size: number) => {
  const p1 = await mouse.getPosition();
  const p2 = new Point(p1.x, p1.y + size);
  const p3 = new Point(p2.x + size, p2.y);
  const p4 = new Point(p3.x, p1.y);

  await mouse.pressButton(Button.LEFT);
  await mouse.move(straightTo(p2));
  await mouse.move(straightTo(p3));
  await mouse.move(straightTo(p4));
  await mouse.move(straightTo(p1));

  await mouse.releaseButton(Button.LEFT);

  return;
};
