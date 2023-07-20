/**
 * Template for Routes Logic of Framework7
 * Name convention: route-{function}.js
 */
import Logger from "/lib/Logger";
import Page from "/pages/Init/index.f7";
import Firebase from "/lib/Firebase/";
import { URLS } from "/constants";
const RouteLogout = (function () {
  const evaluate = function ({ router, resolve, reject, to }) {
    let app = router.app;
    let params = to.params;

    Firebase.logOut(
      () => {
        app.panel.close(".panel-right");
        router.clearPreviousHistory();
        resolve(URLS.transition);
      },
      () => {
        Logger.log("Firebase Logout failed");
      }
    );
  };

  return {
    evaluate,
  };
})();
export default RouteLogout;
