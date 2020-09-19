const awilix = require('awilix');
const express = require('express');
const makeFluentExpress = require('./util/fluentExpress');
const makeApp = require('./app');

// Set Config
require('dotenv').config();
port = process.env.PORT || 3000;

// Create container and register components
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  express: awilix.asValue(express),
  fluentExpress: awilix.asFunction(makeFluentExpress),
  app: awilix.asFunction(makeApp),
});

container.loadModules(['services/*.js', 'controllers/*.js'], {
  formatName: 'camelCase',
  cwd: __dirname,
});

// Resolve and run app
const app = container.resolve('app');

app.listen(port);
console.log(`listening on port ${port}`);
