import Logger from "/lib/Logger";
import {
  WELCOME_MESSAGES_CLIENT,
  WELCOME_MESSAGES_WORKER,
} from "./welcome-messages.js";
import { URLS } from "/constants";
import UserManager from "/js/user-manager.js";
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

  let userName = "";
  let messages = props.isworker
    ? WELCOME_MESSAGES_CLIENT
    : WELCOME_MESSAGES_WORKER;

  const initialize = () => {
    UserManager.setCommonVar($store);
    userName = UserManager.getFirstName();
    messages = messages.map((item) => {
      if (item.hasVariables) {
        item.body = item.body.replace("{name}", userName);
      }
      return item;
    });
    $update();
  };

  const continueButton = () => {
    markUserNoLongerFirstLogin();
    $f7router.navigate(URLS.home, {
      clearPreviousHistory: true,
    });
  };

  const markUserNoLongerFirstLogin = () => {
    const userId = $store.state.user.body.user.uid;
    UserManager.setUserFirstLogin(userId);
  };

  return {
    render: $render,
    values: {
      messages: messages,
    },
    events: {
      continueButton,
    },
    functions: {},
  };
};

export default Page;
