import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { thingsRouter } from './routers/things.router.js';
import { productsRouter } from './routers/products.router.js';
import { usersRouter } from './routers/users.router.js';
import createDebug from 'debug';
import { CustomError } from './interfaces/error.js';

const debug = createDebug('W6:app');

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
// Middleware que nos da información  sobre las request recibidas en el server, por ejemplo: GET /things/545 304 2.757 ms - -
app.use(express.json());
// Middleware para transformar la resp en formato json, que es el objetivo de una API REST
app.use(cors(corsOptions));

app.use((_req, _resp, next) => {
  debug('Soy un middleware');
  next();
});

// Modo más organizado de hacerlo
// Ejemplo para una ruta

app.use('/things', thingsRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Modo más simple de hacerlo
// Ejemplo para la ruta home

app.get('/', (_req, resp) => {
  resp.json({
    info: '/Ejemplo de middleware para respuesta en el directorio raiz con la oferta de endpoints de la API',
    endpoints: {
      things: '/things',
      users: '/users',
      products: '/products',
    },
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

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Middleware de errores');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
    debug(status, statusMessage, error.message);
  }
);
