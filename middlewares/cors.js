import npmCors from 'cors';

export function cors() {
  const options = {
    origin: [
      "http://localhost:8080",
    ],
  };
  return npmCors(options);
}