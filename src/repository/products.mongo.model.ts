import { model, Schema } from 'mongoose';
import { Product } from '../entities/product.js';

const productSchema = new Schema<Product>({
  productSKU: {
    type: String,
    required: true,
    unique: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
});

export const ProductModel = model('Product', productSchema, 'products');
// Los parámetros de model son: Nombre del modelo, esquema definido aplicable, alias en singular y en minúsculas. Si no se añade el tercer parámetro, en mongo se creará una colección basada en el nombre del primer parámetro en minúsculas y terminado con una s
