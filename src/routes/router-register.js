/**
 * Template for Routes Logic of Framework7
 * Name convention: route-{function}.js
 */
import Logger from "/lib/Logger";
import PageChoices from "/pages/RegisterChoices/index.f7";
import PageWorker from "/pages/RegisterWorker/index.f7";
import PageClient from "/pages/RegisterClient/index.f7";
const RouteRegister = (function () {
  const evaluateChoices = function ({ router, resolve, reject, to }) {
    let app = router.app;
    let params = to.params;

    if (1 == 1) {
      resolve(
        {
          popup: {
            component: PageChoices,
          },
        },
        {
          props: {
            name: "choices",
          },
        }
      );
    } else {
      reject();
    }
  };

  const evaluateWorker = function ({ router, resolve, reject, to }) {
    let app = router.app;
    let params = to.params;

    if (1 == 1) {
      resolve(
        {
          popup: {
            component: PageWorker,
          },
        },
        {
          props: {
            name: "worker",
          },
        }
      );
    } else {
      reject();
    }
  };

  const evaluateClient = function ({ router, resolve, reject, to }) {
    let app = router.app;
    let params = to.params;

    if (1 == 1) {
      resolve(
        {
          popup: {
            component: PageClient,
          },
        },
        {
          props: {
            name: "client",
          },
        }
      );
    } else {
      reject();
    }
  };

  return {
    evaluateChoices,
    evaluateWorker,
    evaluateClient,
  };
})();
export default RouteRegister;
