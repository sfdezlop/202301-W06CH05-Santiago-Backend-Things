import { ThingStructure } from '../entities/thing';

export interface Repo<T> {
  read(): Promise<T[]>;
  readId(_id: string): Promise<T>;
  write(_info: Partial<T>): Promise<T>;
  // Update(_info: Partial<T>): Promise<T>;
  update(_idToEdit: string, _recordToEdit: ThingStructure): Promise<T>;
  delete(_id: string): Promise<void>;
}
