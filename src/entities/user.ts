import { Product } from './product';

export type User = {
  id: string;
  email: string;
  passwd: string;
  products: Product[];
};
