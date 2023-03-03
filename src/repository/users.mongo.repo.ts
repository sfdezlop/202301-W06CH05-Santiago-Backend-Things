import debug from 'debug';
import { User } from '../entities/user';
import { HTTPError } from '../interfaces/error.js';
import { Repo } from './repo.interface';
import { UserModel } from './users.mongo.model.js';

export class UsersMongoRepo implements Repo<User> {
  constructor() {
    debug('Instantiated at class UsersMongoRepo');
  }

  async query(): Promise<User[]> {
    debug('Instantiated at class UsersMongoRepo with method query');
    return [];
  }

  async queryId(id: string): Promise<User> {
    debug('Instantiated at class UsersMongoRepo with method queryId');
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async search(query: { key: string; value: unknown }): Promise<User[]> {
    debug('Instantiated at class UsersMongoRepo with method search');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('Instantiated at class UsersMongoRepo with method create');
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<User>): Promise<User> {
    debug('Instantiated at class UsersMongoRepo with method update');
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('Instantiated at class UsersMongoRepo with method destroy');
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
  }
}
