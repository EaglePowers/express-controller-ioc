const {
  createContainer,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');
const express = require('express');
const makeFluentExpress = require('./util/fluentExpress');
const makeApp = require('./app');

// Set Config
require('dotenv').config();
port = process.env.PORT || 3000;

// Create container and register components
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
})
  .register({
    express: asValue(express),
    fluentExpress: asFunction(makeFluentExpress),
    app: asFunction(makeApp),
  })
  .loadModules(['services/*.js', 'controllers/*.js'], {
    formatName: 'camelCase',
    cwd: __dirname,
  });

// Resolve and run app
const app = container.resolve('app');

app.listen(port);
console.log(`listening on port ${port}`);
