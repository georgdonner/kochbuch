# GeorgsRecipes

This project uses a MEAN stack (MongoDB, Express, Angular, Node.js) and the front-end was generated using the [Angular CLI](https://cli.angular.io/).

## API Documentation
All calls to the api go to `/api` and return data in JSON format.

### GET /recipes
Returns all recipes with all its fields. Most notably the `_id` to identify it.

### GET /recipe/id
Returns a single recipe with all its fields, queried by the `_id`, for example `58fb172b117ef500044258c0`.

### GET /list/name
Returns the shopping list info for that particular `name`. In the `list` field, you can find the list as an array of Strings.

### PUT /list/name
You can update a list with the given `name` and get the updated list info back as a response.

**Request body should look like:**
```json
{
  "list": ["Tomaten", "Zwiebeln"]
}
```

### GET /plan/name
Returns the weekplan info for that particular `name`. In the `plan` field, you can find the plan as an array of plan entries.

### PUT /plan/name
You can update a plan with the given `name` and get the updated plan info back as a response.

**Request body should look like:**
```json
{
  "plan": [
    {
      "date": "2017-07-05T14:23:22.292Z",
      "custom": "Tolles Rezept",
      "time": "19:30",
      "servings": 2
    },
    {
      "servings": 3,
      "time": "19:30",
      "custom": "",
      "date": "2017-07-05T14:23:52.898Z",
      "recipe": {
        "title": "Pasta Niçoise",
        "id": "592dca6024770a0004a032da"
      }
    }
  ]
}
```
*NOTE: The first one has a custom title, the second one a recipe from the database. It is required to have `"custom": ""` with a recipe entry*

## How to build locally

You can run a server with your own recipe database:

### Prerequisites

* Node.js and NPM
* Angular CLI globally installed (`npm install -g @angular/cli`)
* Node server watching tool, for example Nodemon (`npm install -g nodemon`)

### Set up environment variables
Create a file named `.env` at the root of the project and put `MONGODB_URI=mongodb://whateveryourmongodburiis` in there. Also, to set up a zauberwort you need to create a variable for it as well: `ZAUBERWORT=test`
Then go to **_src/app/environments_** and change `filestackKey` to whatever your API key is.

### Development server

Run `ng build --watch` and `nodemon server` in two separate terminals for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
