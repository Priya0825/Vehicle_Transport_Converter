import express from 'express';
import fs from 'node:fs/promises';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const HOST = process.env.HOST ?? 'localhost';

const app = express();

app.use(
  express.static('public/'),
);

// app.get('/a', (request, response) => {
//   response.status(200).sendFile('public/a.html', { root: __dirname }); 
// });
app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});
