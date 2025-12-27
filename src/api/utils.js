// src/api/utils.js
export function wait(ms = 200) {
  return new Promise((res) => setTimeout(res, ms));
}
