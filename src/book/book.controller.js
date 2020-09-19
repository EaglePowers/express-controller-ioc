function makeBookController({ bookService }) {
  function findAll(req, res) {
    res.send(bookService.findAll());
  }

  function findById(req, res) {
    res.send(bookService.findById(req.params.id));
  }

  return {
    findAll,
    findById,
  };
}

module.exports = makeBookController;
