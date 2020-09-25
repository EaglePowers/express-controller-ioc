const {
  createContainer,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');
const express = require('express');
const makeApp = require('./app');
const makeAuthorController = require('./controllers/authorController');
const makeBookController = require('./controllers/bookController');
const makeAuthorRouter = require('./routers/authorRouter');
const makeBookRouter = require('./routers/bookRouter');
const makeAuthorService = require('./services/authorService');
const makeBookService = require('./services/bookService');

// Set Config
require('dotenv').config();
const port = process.env.PORT || 3000;

// Create container and register components
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
})
  .register({
    express: asValue(express),
    app: asFunction(makeApp),
    // bookService: asFunction(makeBookService),
    // bookController: asFunction(makeBookController),
    // bookRouter: asFunction(makeBookRouter),
    // authorService: asFunction(makeAuthorService),
    // authorController: asFunction(makeAuthorController),
    // authorRouter: asFunction(makeAuthorRouter)
  })
  .loadModules(['services/*.js', 'controllers/*.js', 'routers/*.js', 'util/*.js'], {
    formatName: 'camelCase',
    cwd: __dirname,
  });

// Resolve and builder based and fluent based apps and listen
const builderApp = container.resolve('app');
builderApp.listen(port);
console.log(`app listening on port ${port}`);
