import { Router } from 'express';
import { ThingsController } from '../controllers/things.controller.js';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

// eslint-disable-next-line new-cap
export const thingsRouter = Router();
const repo = new ThingsFileRepo();
const controller = new ThingsController(repo);

// Inyección de dependencias de la clase del repo en el controller y luego hay que binder
// para que p.e. get viva en el contexto de la clase a la que pertenece.

thingsRouter.get('/', controller.getAll.bind(controller));
// Cuando accedemos a http://localhost:4500/things con GET nos devolverá
// {"date": "2023-02-27T11:04:42.661Z", "result": [
//         {
//             "id": 1,
//             "groupOfThing": "library",
//             "thing": "React"
//         },
//         {
//             "id": 2,
//             "groupOfThing": "framework",
//             "thing": "Redux"
//         }
//     ]
// }

thingsRouter.get('/:id', controller.get.bind(controller));
thingsRouter.post('/', controller.write.bind(controller));
thingsRouter.patch('/:id', controller.patch.bind(controller));
thingsRouter.delete('/:id', controller.delete.bind(controller));
