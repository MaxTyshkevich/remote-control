export const webSocketParser = (data: any): [string, number, number] => {
  let [command, size, figLength] = data.toString().split(' ');

  command = String(command);
  size = Number(size);
  figLength = Number(figLength);

  return [command, size, figLength];
};
