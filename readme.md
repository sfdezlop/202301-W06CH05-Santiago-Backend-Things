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
- Push a GH de la feature/husky con PR, checkout main y pull a main desde GH, checkout a feature/husky y merge con main. checkout -b feature/nuevafeature

### Alta en Sonar

- Alta del proyecto en https://sonarcloud.io/projects
- GH>Settings>Secrets & Variables>Actions>New repo secret: añadir SONAR_TOKEN y Secret

### Añadir estructura de carpetas y archivos de server

- git checkout -b feature/folders
- src, dist y data
- Push a GH, PR, GH Merge, GH Delete Branch
- GIT checkout main, pull, checkout a rama de trabajo, merge a main y checkout -b a feature/check

### Check del funcionamiento del server y de sonar

Hacer PR en modo draft para ver si hay lectura de Sonar

- Sonar: Falta sonar.yml, rehago audit.yml y da error sonar por estar desincronizados package.json y package-lok.json. Ejecuto npm i para tratar de solucionarlo.

# Conexión a mongodb (rama mongo)

- Fichero .env en la raiz del proyecto para introducir las credenciales de acceso a mongo atlas
- Fichero sample.env en la raiz del proyecto para informar de la necesidad de disponer de fichero .env
- Nueva entidad User en /entities
- Nuevo interface para la gestión de errores en /interfaces
- repo.interface.ts en src/repository con la definción de métodos aplicables a todos los repos
- Instalar npm i mongoose @types/mongoose
- users.mongo.model.ts en src/repository con la definición del esquema mongo del modelo que se va a crear en mongo
- Instalar npm i debug @types/debug
- users.mongo.repo.ts en src/repository
- config.ts en src para poder leer el .env con las credenciales de acceso de mongo atlas
- db.connect.ts em src/db para leer config.js y establecer la conexión con mongo atlas
- Cambios en index y app
- users.controller.ts en src/controllers
- users.router.ts en src/routers
- Cambio el symbol userId en el modelo y en el schema por id para que los controllers sean sustituibles más facilmente
