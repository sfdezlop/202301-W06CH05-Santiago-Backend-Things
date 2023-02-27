import { Response, Request } from 'express';
import { file, ThingsFileRepo } from '../repository/things.file.repo.js';
import fs from 'fs/promises';

export class ThingsController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: ThingsFileRepo) {}
  // Esta es la inyección de dependencias del repo en el controller

  // El final de todos los métodos del controller tienen que terminar en una respuesta json para que el frontend utilizando un resp.json para que del lado front fletch pueda entenderse con el back.

  getAll(_req: Request, res: Response) {
    this.repo.read().then((data) => {
      res.json({
        postman:
          'https://web.postman.co/workspace/Bootcamp~c022729b-446d-47c3-812c-2ba968fd50b7/request/25664407-71079839-564a-4c2b-af30-9c4f0c596768',
        method: 'getAll',
        date: new Date(),
        result: data,
      });
    });
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const recordToGet = await this.repo.readId(id);
    res.json({
      postman:
        'https://web.postman.co/workspace/Bootcamp~c022729b-446d-47c3-812c-2ba968fd50b7/request/25664407-76b8e785-e677-4316-afa4-b445f643c6c9',
      method: 'get',
      date: new Date(),
      result: recordToGet,
    });
  }

  async write(req: Request, res: Response) {
    const numberOfRecords = JSON.parse(
      await fs.readFile(file, { encoding: 'utf-8' }).then()
    ).length;
    const { groupOfThing, thing } = req.body;
    const newRecord = { id: numberOfRecords + 1, groupOfThing, thing };
    await this.repo.write([newRecord]);
    res.json({
      postman:
        'https://web.postman.co/workspace/Bootcamp~c022729b-446d-47c3-812c-2ba968fd50b7/request/25664407-39917b97-cb2f-4111-9fdd-0b460b6b5502',
      method: 'write',
      date: new Date(),
      result: newRecord,
    });
  }

  async patch(req: Request, res: Response) {
    const { id } = req.params;
    const partOfRecordToEdit = req.body;
    await this.repo.update(id, partOfRecordToEdit);
    const result = {
      id,
      groupOfThing: partOfRecordToEdit.groupOfThing,
      thing: partOfRecordToEdit.thing,
    };
    res.json({
      postman:
        'https://web.postman.co/workspace/Bootcamp~c022729b-446d-47c3-812c-2ba968fd50b7/request/25664407-857dd2de-02ba-45c5-a58d-f683248c16a4',
      method: 'patch',
      date: new Date(),
      result,
    });
  }

  async delete(req: Request, res: Response) {
    const result = await this.repo.delete(req.params.id);
    // Res.send(req.params.id);
    res.json({
      postman:
        'https://web.postman.co/workspace/Bootcamp~c022729b-446d-47c3-812c-2ba968fd50b7/request/25664407-f9ed9c51-96be-4acd-aef6-1464dd37afb8',
      method: 'delete',
      date: new Date(),
      result,
    });
  }
}
