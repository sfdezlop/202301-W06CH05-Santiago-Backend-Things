# Week 6 - Challenge 5

## API REST Things I already know / Lo que querais

Crea una API REST que se conecte a un fichero JSON, para manipular recursos de tipo _cosas que ya sé_. El JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp.

La API REST debe tener los siguientes endpoints:

[GET] /things -> devuelve el array de cosas que ya sé

[GET] /things/:idThing -> devuelve una cosa que ya sé

[DELETE] /things/:idThing -> borra una cosa que ya sé

[POST] /things -> crea una cosa que ya sé (la recibe en el body)

[PATCH] /things -> modifica una cosa que ya sé (la recibe en el body)

Usamos express con las capas:

- app
- router
- controller
- repo

AÑADIMOS un front con REDUX testado

- Lista de 'things'
- Añadir 'thing'
- Borrar 'thing'
- Editar 'thing'

- Página de detalle

## Proceso de Instalación

- Copiar archivos de raíz de https://github.com/alce65/week6._2023.server.express.git. Modificar autor y name en package.json
- Copiar carpeta .github con solo audit.yml y sonar-project.properties. Modificar el sonar-project.properties con las credenciales del repo de github
- npm i
- npm i -D typescript @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-jest @types/jest
- npm i cross-env
- npm i dotenv
- git init, git add ., git commit -m"Initial Commit"

### Vincular a repo de github

- git remote add origin https://github.com/sfdezlop/202301-W06CH05-Santiago-Backend-Things.git
- git branch -M main
- git push -u origin main

### Protección de rama main

- git checkout -b feature/husky
- npx husky install
- npx husky-init
- Eliminar archivo .husky/pre-commit
- Pegar de otro proyecto los huskies commit-msg y pre-push
- En github proteger rama main en settings>branches
