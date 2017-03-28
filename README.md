# JS Scrum Board

Official repository of JS Scrum board

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
  - Version control
- [Node.js and npm](nodejs.org)
  - Node.js is the platform we are using for the server. aka Javascript running on the server.
  - npm is the node package manager. It can install dependencies.
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
  - Gulp is a task runner. It will run longer scripts that test, build, deploy, and whatever else to the project.
- [MongoDB](https://www.mongodb.org/) (`brew install mongodb`)
  - MongoDB is the database we are using.
  - Checkout [MongoDB Compass](https://www.mongodb.com/products/compass) for a visualizer.
  - Keep a running daemon with `mongod`
- [Yeoman](http://yeoman.io/) (`npm install --global yo`)
  - Yeoman is a generator

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready. (This has been a little buggy, so you may need to wait a couple of seconds and then refresh the page again.)

## This Project

This project was built from the Yeoman [Angular Fullstack](https://github.com/angular-fullstack/generator-angular-fullstack) Generator. You can get an idea of the project structure [here](https://angular-fullstack.github.io/get-started/overview/).

The point of this using yeoman is that parts of the app can be generated. E.g. API endpoints, angular components, etc. The available generators are [here](https://github.com/angular-fullstack/generator-angular-fullstack#generators).

## In General

There is a lot of moving parts to this and we will run into trouble if we don't stay consistent. So try to base what you do off of what is already done. So try to model things like naming conventions file/directory layouts, etc.

## Resources

If you feel so inclined to learn more about the stack, here ya go:

- [AngularJS](https://angularjs.org/) - The home page gives a pretty good overview of angular.
- [REST](http://www.restapitutorial.com/lessons/restquicktips.html) - An overview of REST API's
- [Express](https://webapplog.com/express-js-fundamentals/) - An overview of the server framework we're using.
