const awilix = require('awilix');
const express = require('express');
const makeFluentExpress = require('./util/fluentExpress');
const makeAuthorService = require('./services/authorService');
const makeAuthorController = require('./controllers/authorController');
const makeBookService = require('./services/bookService');
const makeBookController = require('./controllers/bookController');
const makeApp = require('./app');

// Set Config
require('dotenv').config();
port = process.env.PORT || 3000;

// Create container and register components
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  // Libraries
  express: awilix.asValue(express),
  fluentExpress: awilix.asFunction(makeFluentExpress),

  // Services and Controllers
  authorService: awilix.asFunction(makeAuthorService),
  authorController: awilix.asFunction(makeAuthorController),
  bookService: awilix.asFunction(makeBookService),
  bookController: awilix.asFunction(makeBookController),

  // App
  app: awilix.asFunction(makeApp),
});

// Resolve and run app
const app = container.resolve('app');

app.listen(port);
console.log(`listening on port ${port}`);
