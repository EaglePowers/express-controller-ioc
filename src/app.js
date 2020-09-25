function makeApp({ express, bookRouter, authorRouter }) {
  const app = express();

  app.use('/books', bookRouter);
  app.use('/authors', authorRouter);

  return app;
}

module.exports = makeApp;