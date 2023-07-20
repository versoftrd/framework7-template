import Logger from "/lib/Logger";
import { categories } from "/data/index.js";
import {
  MSG_REGISTER_WORKER,
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
  const currentUser = $store.state.user.body.user;
  let isUserExists = false;
  $f7.on("popupOpen", function (popup) {
    if (popup.route.url == URLS.registerWorker) {
      if (props.loginDelegated == true) {
        isUserExists = true;
      }
    }
  });
  $f7.on("closePopup", function (popup) {});
  const closePopup = () => {
    $f7router.back();
  };

  const submitForm = () => {
    let formId = "#form-register-worker";
    let isValidForm = $f7.input.validateInputs(formId);
    if (isValidForm) {
      let userInput = $f7.form.convertToData(formId);
      if (!isUserExists) {
        if (userInput.password !== userInput.confirmPassword) {
          $f7.dialog.alert(MSG_REGISTER_CLIENT.confirmPasswordNoMatch);
          return false;
        }
      }

      if (userInput.services == "0") {
        $f7.dialog.alert(MSG_REGISTER_WORKER.registerWorkerServiceNotSelected);
        return false;
      }

      $f7.dialog.preloader();
      if (!isUserExists) {
        let fullName = `${userInput.name} ${userInput.lastname}`;
        Firebase.register(
          userInput.email,
          userInput.password,
          { name: fullName, ...userInput },
          done,
          failed
        );
      } else {
        done(currentUser, userInput);
      }
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
          roleId: USER_ROLES.worker,
          state: USER_BACK_STATE.active,
          firstLogin: 1,
          documentNumber: input.documentNumber,
        },
      },
      done: (user) => {
        registerServicesWorker(user, input);
      },
      failed,
      $store,
    });
  };

  const registerServicesWorker = (user, input) => {
    const userId = user.users.id;
    const url = CORE_BACKEND_URLS.addServicesWorkers.replace("{id}", userId);
    const body = input.services.map((serviceId) => {
      return { serviceId };
    });
    CoreApiCall({
      service: {
        method: HTTP_METHODS.post,
        url,
        body,
      },
      done: (service) => {
        doneRegisterBackend(user);
      },
      failed,
      $store,
    });
  };

  const doneRegisterBackend = (user) => {
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

  const doneRegisterBackend3 = () => {
    //saveStoreUserInfo(user.users);
    dispose();
    // UserManager.validationsForUserStateOnLogin({
    //   $f7,
    //   $f7router,
    //   $store,
    //   $f7route,
    // });
    // $f7router.navigate(URLS.welcomeClient, {
    //   clearPreviousHistory: true,
    // });
  };

  const failed = (error) => {
    $f7.dialog.close();
    $f7.dialog.alert(error?.message ?? error);
  };

  const dispose = () => {
    $f7.popup.close(".routable-popup-choices", false);
    $f7.popup.close(".popup-login", false);
    $f7.dialog.close();
  };

  const saveStoreUserInfo = (data) => {
    UserManager.setCommonVar($store);
    UserManager.userInfoUpdate(data);
  };

  return {
    render: $render,
    events: {
      closePopup,
      submitForm,
    },
    values: {
      categories: categories,
    },
  };
};

export default Page;
