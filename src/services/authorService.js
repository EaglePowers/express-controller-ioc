function makeAuthorService() {
  const authors = [
    { id: '1', name: 'Ernest Hemingway' },
    { id: '2', name: 'Brett Easton Ellis' },
    { id: '3', name: 'Charles Dickens' },
  ];

  function findById(id) {
    return authors.find((author) => {
      return author.id === id;
    });
  }

  return {
    findById,
  };
}

module.exports = makeAuthorService;
