# GeorgsRecipes

This project uses a MEAN stack (MongoDB, Express, Angular, Node.js) and the front-end was generated using the [Angular CLI](https://cli.angular.io/).

## Prerequisites
* Node.js and NPM
* Angular CLI globally installed (`npm install -g @angular/cli`)
* Node server watching tool, for example Nodemon (`npm install -g nodemon`)

## Set up environment variables
Create a file named `.env` at the root of the project and put `MONGODB_URI=mongodb://whateveryourmongodburiis` in there.
Then go to **_src/app/environments_** and change `filestackKey` to whatever your API key is.

## Development server

Run `ng build --watch` and `nodemon server` in two separate terminals for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
