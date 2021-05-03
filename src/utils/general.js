export function convertUnixTimestamp(unixTimestamp) {
  return new Date(unixTimestamp * 1000);
}
