const FLUENT_METHODS = ['use', 'get', 'put', 'post', 'delete', 'all'];

/**
 * Fluent takes an express instance and returns two utility functions,
 * App() and Router(), which create Express app and routers where calls to
 * functions in FLUENT_METHODS are proxied to return app/router so that
 * calls can be chained together for readability.
 *
 * @param {*} express
 */
function FluentExpress(express) {
  function makeFluent(router) {
    const routerProxy = new Proxy(router, {
      get: (target, prop) => {
        if (FLUENT_METHODS.includes(prop)) {
          return (...arguments) => {
            target[prop](...arguments);
            return routerProxy;
          };
        } else if (prop === 'unwrap') {
          return () => router;
        }

        return target[prop];
      },
    });

    return routerProxy;
  }

  function App() {
    const app = express();

    return makeFluent(app);
  }

  function Router() {
    const router = express.Router();

    return makeFluent(router);
  }

  return {
    App,
    Router,
  };
}

module.exports = FluentExpress;
