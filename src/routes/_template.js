/**
 * Template for Routes Logic of Framework7
 * Name convention: route-{function}.js
 */
import Logger from "/lib/Logger";
import Page from "/pages/Home/index.f7";
const RouteFunction = (function () {
  const evaluate = function ({ router, resolve, reject, to }) {
    let app = router.app;
    let params = to.params;

    if (1 == 1) {
      resolve({
        component: Page,
      });
    } else {
      reject();
    }
  };

  return {
    evaluate,
  };
})();
export default RouteFunction;
