export function getRandomGreeting(obj) {
  const keys = Object.keys(obj);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  return obj[randomKey];
}
