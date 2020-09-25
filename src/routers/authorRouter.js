function makeAuthorRouter({ express, authorController }) {
  const router = express.Router();

  router.get('/:id', authorController.findById);

  return router;
}

module.exports = makeAuthorRouter;
