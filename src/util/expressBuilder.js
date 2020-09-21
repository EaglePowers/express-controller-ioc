function expressBuilder({ express }) {
  function buildApp(config) {
    const app = express();

    processCalls(app, config);

    return app;
  }

  function buildRouter(config) {
    const router = express.Router();

    processCalls(router, config);

    return router;
  }

  function processCalls(router, config) {
    config.forEach((method) => {
      processMethod(router, method);
    });
  }

  function processMethod(router, method) {
    const [op, args] = Object.entries(method)[0];

    router[op](...processArgs(args));
  }

  function processArgs(args) {
    return args.map((arg) => {
      if (arg instanceof Array) {
        const router = express.Router();

        processCalls(router, arg);

        return router;
      } else {
        return arg;
      }
    });
  }

  return {
    buildApp,
    buildRouter,
  };
}

module.exports = expressBuilder;
