import fs from 'fs/promises';
export const file = './data/data.json';

export type GroupOfThingsStructure = {
  groupOfThing: 'packaging' | 'environment' | 'framework';
};

export type ThingStructure = {
  id: number;
  groupOfThing: GroupOfThingsStructure;
  thing: string;
};

export class ThingsFileRepo {
  read() {
    return fs.readFile(file, { encoding: 'utf-8' }).then((table) => {
      console.log(`JSON table in file ${file}:`);
      console.table(table);
      console.log(`Table in file ${file}:`);
      console.table(JSON.parse(table));
      return JSON.parse(table) as ThingStructure[];
    });
  }

  async readId(idToRead: string) {
    const jsonTable = await fs.readFile(file, { encoding: 'utf-8' });
    const table = JSON.parse(jsonTable);
    const record = table.filter((item: any) => item.id === Number(idToRead));
    return record[0];
  }

  async write(newRecord: ThingStructure[]) {
    console.log(`Record to write in file ${file}:`);
    console.table(newRecord);
    const jsonOldTable = await fs.readFile(file, { encoding: 'utf-8' });
    const oldTable = JSON.parse(jsonOldTable);
    console.log(`Pre-written Table in file ${file}:`);
    console.table(oldTable);
    const newTable = [...oldTable, ...newRecord];
    const jsonNewTable = JSON.stringify(newTable);
    await fs.writeFile(file, jsonNewTable, 'utf-8');
    console.log(`Post-written Table in file ${file}:`);
    console.table(newTable);
  }

  async update(idToEdit: string, recordToEdit: ThingStructure) {
    const jsonOldTable = await fs.readFile(file, 'utf-8');
    const oldTable = JSON.parse(jsonOldTable);
    const newTable = oldTable.map((element: any) => {
      if (element.id === Number(idToEdit)) {
        return { ...element, ...recordToEdit };
      }

      return element;
    });
    const jsonNewTable = JSON.stringify(newTable);
    await fs.writeFile(file, jsonNewTable, 'utf-8');
  }

  async delete(idToDelete: string) {
    const jsonOldTable = await fs.readFile(file, 'utf-8');
    const [...oldTable] = JSON.parse(jsonOldTable);
    const jsonNewTable = JSON.stringify(
      oldTable.filter((element: any) => element.id !== Number(idToDelete))
    );
    await fs.writeFile(file, jsonNewTable, 'utf-8');
    return oldTable.filter(
      (element: any) => element.id === Number(idToDelete)
    )[0];
  }
}
