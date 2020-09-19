const makeBookController = require('../../src/controllers/bookController');

describe('makeBookController()', () => {
  let bookServiceStub;
  let controller;

  beforeEach(() => {
    bookServiceStub = {
      findAll: jasmine.createSpy(),
      findById: jasmine.createSpy(),
    };

    controller = makeBookController({ bookService: bookServiceStub });
  });

  it('findAll retrieves all books from bookService', () => {
    allBooks = {
      fake: 'data',
    };

    bookServiceStub.findAll.and.returnValue(allBooks);

    const resStub = {
      send: jasmine.createSpy(),
    };

    controller.findAll(null, resStub);

    expect(bookServiceStub.findAll).toHaveBeenCalled();
    expect(resStub.send).toHaveBeenCalledWith(allBooks);
  });

  it('findById calls bookService correctly', () => {
    const book = {
      fake: 'book',
    };

    bookServiceStub.findById.and.returnValue(book);

    const reqStub = {
      params: {
        id: 12345,
      },
    };

    const resStub = {
      send: jasmine.createSpy(),
    };

    controller.findById(reqStub, resStub);

    expect(bookServiceStub.findById).toHaveBeenCalledWith(reqStub.params.id);
    expect(resStub.send).toHaveBeenCalledWith(book);
  });
});
