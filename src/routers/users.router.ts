import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

// eslint-disable-next-line new-cap
export const usersRouter = Router();
// File Repo const repo = new ThingsFileRepo();
const repo = new UsersMongoRepo();
const controller = new UsersController(repo);

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.get('/:id', controller.get.bind(controller));
usersRouter.post('/', controller.post.bind(controller));
usersRouter.patch('/:id', controller.patch.bind(controller));
usersRouter.delete('/:id', controller.delete.bind(controller));
