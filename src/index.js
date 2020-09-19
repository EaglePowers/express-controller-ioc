const awilix = require('awilix');
const express = require('express');
const makeFluentExpress = require('./util/fluent-express');
const makeAuthorService = require('./author/author.service');
const makeAuthorController = require('./author/author.controller');
const makeBookService = require('./book/book.service');
const makeBookController = require('./book/book.controller');
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
