import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { thingsRouter } from './router/things.router.js';

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
// Middleware que nos da información  sobre las request recibidas en el server, por ejemplo: GET /things/545 304 2.757 ms - -

app.use(express.json());
// Middleware para transformar la req.body en formato json

app.use(cors(corsOptions));

// App.use((_req, _resp, next) => {
//   console.log('Soy un middleware');
//   next();
// });

// Modo más organizado de hacerlo
// Ejemplo para una ruta

app.use('/things', thingsRouter);
// Middleware para definir un endopoint para nuestra aplicación

// Modo más simple de hacerlo
// Ejemplo para la ruta home

app.get('/', (_req, resp) => {
  resp.json({
    name: 'Pepe',
    age: 22,
    date: new Date(),
    object: { field1: 'hola' },
  });
});
app.get('/:id', (req, resp) => {
  resp.send('Hola ' + req.params.id);
});
app.post('/', (req, resp) => {
  req.body.id = 12;
  resp.send(req.body);
});
app.patch('/:id');
app.delete('/:id');
