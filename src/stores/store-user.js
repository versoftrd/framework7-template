/**
 * Template for Stores of Framework7
 * Name convention: store-{function}.js
 */
const StoreUser = (function () {
  const entity = {
    context: {
      isFreshRegistry: false,
    },
    body: {
      user: {
        displayName: "Usuario",
        photoURL: "/assets/images/profile-generic.jpg",
      },
      userInfo: {
        id: 0,
        roleId: 0,
        state: 0,
      },
    },
  };

  function get({ state }) {
    return state.user;
  }

  function set({ state }, newElement) {
    state.user = state.user;
    state.user.context.userLogged = true;
    state.user.body.user = newElement;
  }

  function clearUser({ state }) {
    state.user = state.user;
    state.user.context.userLogged = false;
    state.user.body.user = entity.body.user;
    state.user.body.userInfo = entity.body.userInfo;
  }

  function updateUser({ state }, newElement) {
    state.user = state.user;
    state.user.body.user = newElement;
  }

  function setFreshRegistry({ state }, newElement) {
    state.user = state.user;
    state.user.context.isFreshRegistry = newElement;
  }

  function updateUserInfo({ state }, newElement) {
    state.user = state.user;
    state.user.body.userInfo = newElement;
  }

  function reset({ state }) {
    state.user = entity;
  }

  return {
    entity,
    get,
    set,
    updateUser,
    updateUserInfo,
    clearUser,
    reset,
    setFreshRegistry,
  };
})();
export default StoreUser;
