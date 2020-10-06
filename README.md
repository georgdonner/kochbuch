# Georgs recipes

Collect your recipes, plan your next meals and organise your grocery shopping with a shopping list.

Powered by an Express server, rendered with React and data stored in a MongoDB database. Thanks to service workers, you can search and view recipes even when you are offline. If you are convinced, install it as a PWA (progressive web app) on your phone for an even better experience!

In order to add/update recipes and use the weekplan & shopping list in the frontend, you need to login. To do that, type "login" into the search field, hit Enter and enter the password on the next page (or go to /login). If you don't know the password, kindly ask the admin about it ;)

## How to build locally

You can run a server with your own recipe database:

### Prerequisites

* Node.js and NPM, Version 10 is highly recommended
* A MongoDB database
* HTTPS correctly set up, even on localhost - more info below

### Set up environment variables

Create a file named `.env` at the root of the project and put `MONGODB_URI=mongodb://whateveryourmongodburiis` in there.

To set up a zauberwort, you need to create a variable for it as well: `ZAUBERWORT=test`. The zauberwort is required for users in the frontend to add/update recipes.

For the image upload to an AWS bucket, add its name as `AWS_BUCKET` and your `AWS_KEY` and `AWS_SECRET` to the `.env` file.

### Development server

- `npm install` to install all required packages.
- `npm start` to start the server.
- `npm run client` to render the client side files and reload on change (`npm run build` for the production build)

For service workers and PWAs to work properly, HTTPS is required. That's why all http traffic gets redirected. For that to work on localhost, make sure `NODE_ENV` is set to `development` before starting the server and you have a trusted *.crt* and *.key* file in the `certs` folder.
