export type GroupOfThingsStructure = {
  groupOfThing: 'packaging' | 'environment' | 'framework';
};

export type ThingStructure = {
  id: number;
  groupOfThing: GroupOfThingsStructure;
  thing: string;
};
