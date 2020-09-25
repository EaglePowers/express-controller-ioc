function makeBookRouter({ express, bookController }) {
  const router = express.Router();

  router.get('/', bookController.findAll);
  router.get('/:id', bookController.findById);

  return router;
};

module.exports = makeBookRouter;