import Logger from "/lib/Logger";
import UserManager from "/js/user-manager.js";
import {
  USER_STATE,
  URLS,
  USER_BACK_STATE,
  USER_MESSAGES,
  INIT_MESSAGES,
  STORAGE,
} from "/constants/";
import Firebase from "/lib/Firebase";
import { getCoreBackendToken } from "/backend/core-api.js";
import { sleep, pushdata, popdata } from "/utils";
const Page = (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store },
  $render
) => {
  $on("pageInit", (e, page) => {
    Logger.info({ path: page.name, body: "pageInit" });
    Logger.state({ body: $store.state });
    initialize();
  });

  const initialize = () => {
    UserManager.init($store, userValidationInitResult);
    getBackToken();
  };

  const userValidationInitResult = (state) => {
    switch (state) {
      case USER_STATE.logged:
        const isFreshRegistry = $store.state.user.context.isFreshRegistry;
        if (!isFreshRegistry) {
          UserManager.validationsForUserStateOnLogin({
            $f7,
            $f7router,
            $store,
            $f7route,
          });
        }
        break;
      case USER_STATE.notLogged:
        const lastHistory = $f7router.history.slice(-1);
        if (lastHistory[0] !== URLS.login) {
          $f7router.navigate(URLS.login);
        }
        break;
      default:
        $f7router.navigate(URLS.login);
        break;
    }
  };

  const getBackToken = () => {
    getCoreBackendToken({
      done: (data) => {},
      failed: (error) => {
        Logger.error("Cannot get backend token on init.");
      },
      $store,
    });
  };

  const userStateInitilize = () => {
    if (UserManager.getUserStateMecanismOnInit()) {
      const userId = $store.state.user.body.user.uid;
      const userBackId = $store.state.user.body.userInfo.id;
      if (userBackId !== 0) {
        //Si es diferente de 0, se acaba de registrar
        UserManager.getUserBackendInfo(userId)
          .then((response) => {
            const userBack = response;
            if (!userBack.success) {
              Firebase.logOut();
              $f7.dialog.alert(INIT_MESSAGES.backInitFailed);
              $f7router.navigate(URLS.login);
            } else {
              const userIsActive = verifyUserState(userBack.data);
              if (!userIsActive) {
                $f7.dialog.alert(USER_MESSAGES.inactive);
                $f7router.navigate(URLS.login);
              } else {
                UserManager.userInfoUpdate(userBack.data);
                if (!verifyFirstLogin(userBack.data)) {
                  $f7router.navigate(URLS.home);
                } else {
                  $f7router.navigate(URLS.welcomeClient);
                }
              }
            }
          })
          .catch((error) => {
            Firebase.logOut();
            $f7.dialog.alert(INIT_MESSAGES.backInitFailed);
            $f7router.navigate(URLS.login);
          });
      } else {
        $f7router.navigate(URLS.welcomeClient);
      }
    }
  };

  return {
    render: $render,
    events: {},
    functions: {},
  };
};

export default Page;
