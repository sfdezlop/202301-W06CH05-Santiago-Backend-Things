import { Response, Request } from 'express';
import { file, ThingsFileRepo } from '../repository/things.file.repo.js';
import fs from 'fs/promises';

export class ThingsController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: ThingsFileRepo) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    resp.send('This is thing ' + req.params.id);
  }

  async write(req: Request, res: Response) {
    const numberOfRecords = JSON.parse(
      await fs.readFile(file, { encoding: 'utf-8' }).then()
    ).length;
    const { groupOfThing, thing } = req.body;
    const newRecord = { id: numberOfRecords + 1, groupOfThing, thing };
    await this.repo.write([newRecord]);
    res.json(newRecord);
  }

  async patch(req: Request, res: Response) {
    const { id } = req.params;
    const partOfRecordToEdit = req.body;
    await this.repo.update(id, partOfRecordToEdit);
    res.json(partOfRecordToEdit);
  }

  async delete(req: Request, res: Response) {
    await this.repo.delete(req.params.id);
    res.send(req.params.id);
  }
}
