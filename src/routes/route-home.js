/**
 * Template for Routes Logic of Framework7
 * Name convention: route-{function}.js
 */
import Logger from "/lib/Logger";
import Page from "/pages/Home/index.f7";
import Login from "/pages/Login/index.f7";
import UserManager from "/js/user-manager.js";
const RouteHome = (function () {
  const evaluate = function ({ router, resolve, reject, to }) {
    let app = router.app;
    let params = to.params;
    UserManager.setCommonVar(app.store);

    if (UserManager.isUserLogged()) {
      resolve({
        component: Page,
      });
    } else {
      resolve({
        popup: {
          component: Login,
        },
      });
    }
  };

  return {
    evaluate,
  };
})();
export default RouteHome;
