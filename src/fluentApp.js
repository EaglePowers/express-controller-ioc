function makeFluentApp({ fluentExpress, bookController, authorController }) {
  const { App, Router } = fluentExpress;

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

  // Maybe it makes sense to return the raw express app.
  return app.unwrap();
}

module.exports = makeFluentApp;
