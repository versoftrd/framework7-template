import Logger from "/lib/Logger";
import UserManager from "/js/user-manager.js";
import { USER_STATE, URLS } from "/constants/";
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
    UserManager.setCommonVar($store);
    userValidationInitResult(
      UserManager.isUserLogged() ? USER_STATE.logged : USER_STATE.noLogged
    );
  };

  const userValidationInitResult = (state) => {
    switch (state) {
      case USER_STATE.logged:
        $f7router.navigate(URLS.home);
        break;
      case USER_STATE.noLogged:
        $f7router.navigate(URLS.login);
        break;
      default:
        $f7router.navigate(URLS.login);
        break;
    }
  };
  return {
    render: $render,
    events: {},
    functions: {},
  };
};

export default Page;
