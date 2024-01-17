import express from 'express';
import { pokemon } from './pokemon';
import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/pokemon', (req, res) => {
  res.send(pokemon);
});

app.get('/search', (req, res) => {
  res.send(
    pokemon.filter(({ name: { english } }) =>
      english
        .toLowerCase()
        .includes(req.query.q?.toString().toLowerCase() ?? '')
    )
  );
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
