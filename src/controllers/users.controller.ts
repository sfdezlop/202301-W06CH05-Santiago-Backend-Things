import { Response, Request, NextFunction } from 'express';
import debug from 'debug';
import { User } from '../entities/user';
import { Repo } from '../repository/repo.interface';
import { HTTPError } from '../interfaces/error.js';
import { Auth, PayloadToken } from '../services/auth.js';

export class UsersController {
  constructor(public repo: Repo<User>) {
    debug('Instantiated at class UsersController');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Instantiated at class UsersController method register:post');
      if (!req.body.email || !req.body.passwd)
        throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');
      req.body.passwd = await Auth.hash(req.body.passwd);
      req.body.things = [];
      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Instantiated at class UsersController method login:post');
      if (!req.body.email || !req.body.passwd)
        throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');
      if (!(await Auth.compare(req.body.passwd, data[0].passwd)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');
      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
        role: 'admin',
      };
      const token = Auth.createJWT(payload);
      resp.status(202);
      resp.json({
        token,
      });
    } catch (error) {
      next(error);
    }

    // Llegan datos usuario en el Bo0dy

    // Seach by email

    // Si lo tengo -> crear el token

    // Send el token

    // Si no lo tengo

    // Send erreor
  }
}
