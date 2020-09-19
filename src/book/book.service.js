function makeBookService() {
  const books = [
    { id: '1', title: 'A Farewell to Arms', author: 'Ernest Hemingway' },
    { id: '2', title: 'American Psycho', author: 'Brett Easton Ellis' },
    { id: '3', title: 'A Christmas Carol', author: 'Charles Dickens' },
  ];

  function findAll() {
    return books;
  }

  function findById(id) {
    return books.find((book) => book.id === id);
  }

  return {
    findAll,
    findById,
  };
}

module.exports = makeBookService;
