import Logger from "/lib/Logger";
import UserManager from "/js/user-manager.js";
import { URLS } from "/constants/";
const Page = (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store },
  $render,
  values
) => {
  values.userName = "";
  $f7.on("popupOpen", function (popup) {
    UserManager.setCommonVar($store);
    if (popup.route.url == URLS.registerChoices) {
      if (props.loginDelegated == true) {
        values.userName = UserManager.getFirstName();
        $update();
      }
    }
  });
  $f7.on("closePopup", function (popup) {});
  const closePopup = () => {
    $f7router.back();
  };

  const goToRegisterWorkerDelegated = () => {
    $f7router.navigate(URLS.registerWorker, {
      clearPreviousHistory: false,
      props: {
        loginDelegated: true,
        userName: values.userName,
      },
    });
  };

  return {
    render: $render,
    events: {
      closePopup,
      goToRegisterWorkerDelegated,
    },
  };
};

export default Page;
