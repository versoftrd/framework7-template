/**
 * User Manager and life cycle
 */
import Logger from "/lib/Logger";
import Firebase from "/lib/Firebase/";
import {
  USER_STATE,
  HTTP_METHODS,
  CORE_BACKEND_URLS,
  STORAGE,
  URLS,
  USER_BACK_STATE,
  USER_MESSAGES,
  INIT_MESSAGES,
  CORE_BACK_ERROR_CODE,
} from "/constants/";
import { CoreApiCallAsync } from "/backend/core-api.js";
import { pushdata, popdata, capitalizeString, sleep } from "/utils/";
const UserManager = (function () {
  let $store;
  let resultCallback;
  const STORE_PREFIX = "userManager_";
  const constants = {
    STORE_ADD_USER: STORE_PREFIX + "set",
    STORE_ADD_USER: STORE_PREFIX + "set",
    STORE_UPDATE_USER: STORE_PREFIX + "updateUser",
    STORE_UPDATE_USER_INFO: STORE_PREFIX + "updateUserInfo",
    STORE_CLEAR_USER: STORE_PREFIX + "clearUser",
    STORE_RESET_USER: STORE_PREFIX + "reset",
    STORE_FRESH_REGISTRY: STORE_PREFIX + "setFreshRegistry",
  };

  const setCommonVar = (store) => {
    $store = store;
  };

  const init = (store, callback) => {
    Firebase.onChangeAuthStatus(
      userStateValidationLogged,
      userStateValidationNotLogged
    );
    resultCallback = callback;
    setCommonVar(store);
  };

  const userStateValidationLogged = (user) => {
    $store.dispatch(constants.STORE_ADD_USER, user);
    Logger.log("userStateValidationLogged: Store User Added");
    resultCallback(USER_STATE.logged);
  };

  const userStateValidationNotLogged = () => {
    sleep(200).then(() => {
      $store.dispatch(constants.STORE_CLEAR_USER);
      Logger.log("userStateValidationNotLogged: Store User Clear");
      resultCallback(USER_STATE.notLogged);
    });
  };

  const userUpdate = (user) => {
    $store.dispatch(constants.STORE_UPDATE_USER, user);
    Logger.log("userUpdate: Store User Updated");
  };

  const setFreshRegistry = (val) => {
    $store.dispatch(constants.STORE_FRESH_REGISTRY, val);
    Logger.log("userUpdate: Is User Fresh Registry");
  };

  const userInfoUpdate = (user) => {
    $store.dispatch(constants.STORE_UPDATE_USER_INFO, user);
    Logger.log("userInfoUpdate: Store User Info Updated");
  };

  const isUserLogged = () => {
    let user = $store.state.user;
    let res = user.context.userLogged ?? false;
    Logger.log("isUserLogged: " + res);
    return res;
  };

  const validationsForUserStateOnLogin = (
    params,
    isAutoStateChange = false
  ) => {
    const { $f7, $f7router, $store, $f7route } = params;
    const userId = $store.state.user.body.user.uid;
    const userBackId = $store.state.user.body.userInfo.id;
    if (userBackId == 0) {
      getUserBackendInfo(userId)
        .then((response) => {
          const userBack = response;
          if (!userBack.success) {
            if (userBack.code == CORE_BACK_ERROR_CODE.userNotExists) {
              $f7router.navigate(URLS.registerChoices, {
                clearPreviousHistory: true,
                props: {
                  loginDelegated: true,
                },
              });
            } else {
              Firebase.logOut();
              $f7.dialog.alert(INIT_MESSAGES.backInitFailed);
            }
          } else {
            commonLogicForRouteUserByState({
              ...params,
              userInfo: userBack.data,
            });
          }
        })
        .catch((error) => {
          Firebase.logOut();
          $f7.dialog.alert(INIT_MESSAGES.backInitFailed);
        })
        .finally(() => {
          $f7.dialog.close();
        });
    } else {
      const userInfo = $store.state.user.body.userInfo;
      commonLogicForRouteUserByState({
        ...params,
        userInfo,
      });
      $f7.dialog.close();
    }
  };

  const commonLogicForRouteUserByState = (params) => {
    const { $f7, $f7router, $store, $f7route, userInfo } = params;
    const userIsActive = verifyUserState(userInfo);
    if (!userIsActive) {
      Firebase.logOut();
      $f7.dialog.alert(USER_MESSAGES.inactive);
    } else {
      userInfoUpdate(userInfo);
      if (!verifyFirstLogin(userInfo)) {
        $f7router.navigate(URLS.home, {
          clearPreviousHistory: true,
        });
      } else {
        $f7router.navigate(URLS.welcomeClient, {
          clearPreviousHistory: true,
        });
      }
    }
  };

  const verifyUserState = (userInfo) => {
    if (userInfo.state != USER_BACK_STATE.active) {
      return false;
    }
    return true;
  };

  const verifyFirstLogin = (userInfo) => {
    return userInfo.firstLogin == USER_BACK_STATE.firstTimeLogin ? true : false;
  };

  //Backend User
  const getUserBackendInfo = async (userId) => {
    const serviceUrl = CORE_BACKEND_URLS.getUser.replace("{id}", userId);

    try {
      const pr = await CoreApiCallAsync({
        service: {
          method: HTTP_METHODS.get,
          url: serviceUrl,
          body: null,
        },
        $store,
      });
      return pr;
    } catch (error) {
      return { success: false };
    }
    return { success: false };
  };

  const setUserFirstLogin = async (userId) => {
    const serviceUrl = CORE_BACKEND_URLS.firstLogin.replace("{id}", userId);
    try {
      const pr = await CoreApiCallAsync({
        service: {
          method: HTTP_METHODS.post,
          url: serviceUrl,
          body: null,
        },
        $store,
      });
      return pr;
    } catch (error) {
      return { success: false };
    }
    return { success: false };
  };

  const getFirstName = () => {
    let userName = $store.state.user.body.user.displayName;
    let firstName = userName.split(" ");
    return firstName.length > 0 ? capitalizeString(firstName[0]) : "Anónim@";
  };

  const setUserStateMecanismFirstTime = () => {
    let isFirstTime = popdata(STORAGE.KEYS.initFlowStarted);
    if (isFirstTime == null) {
      pushdata(STORAGE.KEYS.initFlowStarted, {
        value: STORAGE.VALUES.initFlowStartedOff,
      });
    }
  };
  const changeUserStateMecanismOnInit = () => {
    pushdata(STORAGE.KEYS.initFlowStarted, {
      value: STORAGE.VALUES.initFlowStartedOn,
    });
  };

  const getUserStateMecanismOnInit = () => {
    return (
      popdata(STORAGE.KEYS.initFlowStarted)?.value ==
        STORAGE.VALUES.initFlowStartedOn ?? false
    );
  };

  const getCurrentUser = ($store) => {
    const { displayName, photoURL, email, emailVerified, providerId, uid } =
      $store.state.user.body.user;

    const { id, documentNumber, firstLogin, phone, roleId, state } =
      $store.state.user.body.userInfo;

    return {
      displayName,
      photoURL,
      email,
      emailVerified,
      providerId,
      firebaseId: uid,
      userId: id,
      documentNumber,
      firstLogin,
      phone,
      roleId,
      state,
    };
  };

  return {
    init,
    setCommonVar,
    isUserLogged,
    userUpdate,
    setFreshRegistry,
    userInfoUpdate,
    getUserBackendInfo,
    setUserFirstLogin,
    getFirstName,
    getCurrentUser,
    validationsForUserStateOnLogin,
  };
})();
export default UserManager;
