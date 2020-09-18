function AuthorController(authorService) {
  function findById(req, res) {
    return res.send(authorService.findById(req.params.id));
  }

  return {
    findById,
  };
}

module.exports = AuthorController;
