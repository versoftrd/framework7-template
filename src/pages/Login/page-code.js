import Logger from "/lib/Logger";
import Firebase from "/lib/Firebase/";
import UserManager from "/js/user-manager.js";
import { URLS } from "/constants/";
const Page = (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store },
  $render
) => {
  $on("pageInit", (e, page) => {
    Logger.info({ path: page.name, body: "pageInit" });
    Logger.state({ body: $store.state });
    UserManager.setCommonVar($store);
  });

  const submitForm = () => {
    let formId = "#form-login";
    let isValidForm = $f7.input.validateInputs(formId);
    if (isValidForm) {
      let userInput = $f7.form.convertToData(formId);
      $f7.dialog.preloader();
      Firebase.login(userInput.email, userInput.password, done, failed);
    }
  };

  const googleLogin = () => {
    $f7.dialog.preloader();
    UserManager.setFreshRegistry(true);
    Firebase.googleLogin(done, failed);
  };

  const done = (user) => {
    UserManager.validationsForUserStateOnLogin({
      $f7,
      $f7router,
      $store,
      $f7route,
    });
    // $f7.dialog.close();
    // $f7router.navigate(URLS.home, {
    //   clearPreviousHistory: true,
    // });
  };

  const failed = (error) => {
    $f7.dialog.close();
    $f7.dialog.alert(error.message);
  };

  return {
    render: $render,
    events: {
      submitForm,
      googleLogin,
    },
  };
};

export default Page;
