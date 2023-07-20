import Logger from "/lib/Logger";
import {
  MSG_REGISTER_CLIENT,
  URLS,
  HTTP_METHODS,
  CORE_BACKEND_URLS,
  USER_ROLES,
  USER_BACK_STATE,
  GENERIC_MESSAGES,
} from "/constants/";
import Firebase from "/lib/Firebase/";
import { CoreApiCall } from "/backend/core-api.js";
import UserManager from "/js/user-manager.js";
const Page = (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store },
  $render
) => {
  $f7.on("popupOpen", function (popup) {
    if (popup.route.url == URLS.registerClient) {
      UserManager.setCommonVar($store);
    }
  });
  $f7.on("closePopup", function (popup) {});

  const closePopup = () => {
    $f7router.back();
  };

  const submitForm = () => {
    let formId = "#form-register-client";
    let isValidForm = $f7.input.validateInputs(formId);
    if (isValidForm) {
      let userInput = $f7.form.convertToData(formId);
      if (userInput.password !== userInput.confirmPassword) {
        $f7.dialog.alert(MSG_REGISTER_CLIENT.confirmPasswordNoMatch);
        return false;
      }
      let fullName = `${userInput.name} ${userInput.lastname}`;
      $f7.dialog.preloader();
      Firebase.register(
        userInput.email,
        userInput.password,
        { name: fullName, phone: userInput.phone },
        done,
        failed
      );
    }
  };

  const done = (user, input) => {
    UserManager.userUpdate(user);
    CoreApiCall({
      service: {
        method: HTTP_METHODS.post,
        url: CORE_BACKEND_URLS.addUser,
        body: {
          fullName: user.displayName,
          phone: input.phone,
          email: user.email,
          firebaseId: user.uid,
          firebaseProviders: user.providerId,
          roleId: USER_ROLES.client,
          state: USER_BACK_STATE.active,
          firstLogin: 1,
        },
      },
      done: doneRegisterBackend,
      failed,
      $store,
    });
  };

  const doneRegisterBackend = (user) => {
    UserManager.setFreshRegistry(true);
    saveStoreUserInfo(user.users);
    dispose();
    UserManager.validationsForUserStateOnLogin({
      $f7,
      $f7router,
      $store,
      $f7route,
    });
    // $f7router.navigate(URLS.welcomeClient, {
    //   clearPreviousHistory: true,
    // });
  };

  const failed = (error) => {
    $f7.dialog.close();
    $f7.dialog.alert(GENERIC_MESSAGES.error);
  };

  const dispose = () => {
    $f7.popup.close(".routable-popup-choices", false);
    $f7.popup.close(".popup-login", false);
    $f7.dialog.close();
  };

  const saveStoreUserInfo = (data) => {
    UserManager.userInfoUpdate(data);
  };

  return {
    render: $render,
    events: {
      closePopup,
      submitForm,
    },
  };
};

export default Page;
