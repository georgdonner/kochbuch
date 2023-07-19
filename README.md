Welcome to Georg's Recipes!

Discover a delightful way to collect your favorite recipes, plan your meals, and organize your grocery shopping all in one place. With the power of an Express server, the elegance of React for rendering, and the efficiency of a MongoDB database for storage, Georg's Recipes brings you a seamless culinary experience. Plus, thanks to service workers, you can search and view recipes even when you're offline. For an enhanced experience, install Georg's Recipes as a Progressive Web App (PWA) on your phone!

To unlock the full features of adding and updating recipes, as well as utilizing the weekplan and shopping list functionalities, you need to log in. Simply type "login" into the search field, press Enter, and enter the provided password on the subsequent page (or visit /login). If you don't have the password, kindly reach out to the administrator for assistance.

### Local Build Instructions

To run a server with your own recipe database, follow these steps:

### Prerequisites

Ensure you have the following prerequisites in place:

* Node.js and NPM (Version 10 is highly recommended)
* MongoDB database
* Proper HTTPS setup, even on localhost (more information below)

### Setting Up Environment Variables

Create a file named `.env` at the project's root directory and add the following line: `MONGODB_URI=mongodb://<your-mongodb-uri>`. This specifies the URI of your MongoDB database.

To set up a "zauberwort" (magic word) required for users in the frontend to add/update recipes, create a variable named `ZAUBERWORT` in the `.env` file. For example: `ZAUBERWORT=test`.

If you plan to upload images to an AWS bucket, include its name as `AWS_BUCKET` and provide your `AWS_KEY` and `AWS_SECRET` in the `.env` file.

### Development Server

Follow these steps to start the development server:

1. Run `npm install` to install all the required packages.
2. Execute `npm start` to start the server.
3. Run `npm run client` to render the client-side files and enable live reloading on changes (use `npm run build` for the production build).

To ensure proper functionality of service workers and PWAs, HTTPS is required. Consequently, all HTTP traffic is redirected. To make this work on localhost, set `NODE_ENV` to `development` before starting the server, and make sure you have trusted `*.crt` and `*.key` files in the `certs` folder.

Enjoy an impressive cooking experience with Georg's Recipes!
