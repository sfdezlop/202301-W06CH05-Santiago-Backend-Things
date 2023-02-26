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

  patch(_req: Request, _resp: Response) {}

  delete(_req: Request, _resp: Response) {}
}
