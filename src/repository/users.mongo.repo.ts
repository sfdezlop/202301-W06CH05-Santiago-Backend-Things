import { User } from '../entities/user';
import { HTTPError } from '../interfaces/error.js';
import { Repo } from './repo.interface';
import { UserModel } from './users.mongo.model.js';
import createDebug from 'debug';
const debug = createDebug('w6:app');

export class UsersMongoRepo implements Repo<User> {
  constructor() {
    debug('Instantiated at class UsersMongoRepo');
  }

  async query(): Promise<User[]> {
    debug('Instantiated at query method in class UsersMongoRepo');
    const data = await UserModel.find();
    return data;
  }

  async queryId(id: string): Promise<User> {
    debug('Instantiated at queryId method in class UsersMongoRepo');
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('Instantiated at create method in class UsersMongoRepo');
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<User>): Promise<User> {
    debug('Instantiated at update method in class UsersMongoRepo');
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data)
      throw new HTTPError(404, 'Id not found', 'Id not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('Instantiated at destroy method in class UsersMongoRepo');
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: Id not found'
      );
  }
}
