const {
  createContainer,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');
const express = require('express');
const makeFluentApp = require('./fluentApp');
const makeBuilderApp = require('./builderApp');

// Set Config
require('dotenv').config();
const builderPort = process.env.BUILDER_PORT || 3000;
const fluentPort = process.env.FLUENT_PORT || 3001;

// Create container and register components
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
})
  .register({
    express: asValue(express),
    fluentApp: asFunction(makeFluentApp),
    builderApp: asFunction(makeBuilderApp),
  })
  .loadModules(['services/*.js', 'controllers/*.js', 'util/*.js'], {
    formatName: 'camelCase',
    cwd: __dirname,
  });

// Resolve and builder based and fluent based apps and listen
const builderApp = container.resolve('builderApp');
builderApp.listen(builderPort);
console.log(`builder app listening on port ${builderPort}`);

const fluentApp = container.resolve('fluentApp');
builderApp.listen(fluentPort);
console.log(`fluent app listening on port ${fluentPort}`);
