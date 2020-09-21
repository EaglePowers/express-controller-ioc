function makeBuilderApp({ expressBuilder, bookController, authorController }) {
  // prettier-ignore
  const appConfig = [
    {
      use: [
        '/books', [
          { get: ['/', bookController.findAll] },
          { get: ['/:id', bookController.findById] },
        ]
      ],
    },
    {
      use: [
        '/authors', [
          { get: ['/:id', authorController.findById] }
        ]
      ],
    },
  ];

  const app = expressBuilder.build(appConfig);

  return app;
}

module.exports = makeBuilderApp;
