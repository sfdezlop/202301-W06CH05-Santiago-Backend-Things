import { Product } from '../entities/product';
import { HTTPError } from '../interfaces/error.js';
import { Repo } from './repo.interface';
import { ProductModel } from './products.mongo.model.js';
import createDebug from 'debug';
const debug = createDebug('W6:app');

export class ProductsMongoRepo implements Repo<Product> {
  constructor() {
    debug('Instantiated at class ProductsMongoRepo');
  }

  async query(): Promise<Product[]> {
    debug('Instantiated at query method in class ProductsMongoRepo');
    const data = await ProductModel.find();
    return data;
  }

  async queryId(id: string): Promise<Product> {
    debug('Instantiated at queryId method in class ProductsMongoRepo');
    const data = await ProductModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async create(info: Partial<Product>): Promise<Product> {
    debug('Instantiated at create method in class ProductsMongoRepo');
    const data = await ProductModel.create(info);
    return data;
  }

  async update(info: Partial<Product>): Promise<Product> {
    debug('Instantiated at update method in class ProductsMongoRepo');
    const data = await ProductModel.findByIdAndUpdate(info.productId, info, {
      new: true,
    });
    if (!data)
      throw new HTTPError(404, 'Id not found', 'Id not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('Instantiated at destroy method in class ProductsMongoRepo');
    const data = await ProductModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: Id not found'
      );
  }
}
