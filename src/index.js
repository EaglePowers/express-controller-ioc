const express = require('express');
const FluentExpress = require('./util/fluent-express');
const AuthorService = require('./author/author.service');
const AuthorController = require('./author/author.controller');
const BookService = require('./book/book.service');
const BookController = require('./book/book.controller');

// Set Config
require('dotenv').config();
port = process.env.PORT || 3000;

// Create instances and wire up
const authorService = AuthorService();
const authorController = AuthorController(authorService);
const bookService = BookService();
const bookController = BookController(bookService);

// Create app and configure routes using FluentExpress wrapper
const { App, Router } = FluentExpress(express);
// prettier-ignore
const app = App()
  .use(
    '/books', 
    Router()
      .get('/', bookController.findAll)
      .get('/:id', bookController.findById)
  )
  .use(
    '/authors', 
    Router()
      .get('/:id', authorController.findById)
  );

// Unwrap to normal express app
// Would really only be needed when the return value of
// one of the FLUENT_METHODS in fluent-express.js is needed.
// Maybe this isn't even needed - need to check the api.
const expressApp = app.unwrap();
expressApp.get('/hello', (req, res) => {
  res.send('world');
});

app.listen(port);
console.log(`listening on port ${port}`);
