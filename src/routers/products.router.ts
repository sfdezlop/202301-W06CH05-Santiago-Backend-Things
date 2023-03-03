import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { ProductsMongoRepo } from '../repository/products.mongo.repo.js';

// eslint-disable-next-line new-cap
export const productsRouter = Router();
// File Repo const repo = new ThingsFileRepo();
const repo = new ProductsMongoRepo();
const controller = new ProductsController(repo);

productsRouter.get('/', controller.getAll.bind(controller));
productsRouter.get('/:id', controller.get.bind(controller));
productsRouter.post('/', controller.post.bind(controller));
productsRouter.patch('/:id', controller.patch.bind(controller));
productsRouter.delete('/:id', controller.delete.bind(controller));
