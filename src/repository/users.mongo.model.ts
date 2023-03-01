import { model, Schema } from 'mongoose';
import { User } from '../entities/user.js';

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userFirstName: {
    type: String,
    required: true,
  },
  userLastName: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
});

export const UserModel = model('User', userSchema, 'users');
// Los parámetros de model son: Nombre del modelo, esquema definido aplicable, alias en singular y en minúsculas. Si no se añade el tercer parámetro, en mongo se creará una colección basada en el nombre del primer parámetro en minúsculas y terminado con una s
