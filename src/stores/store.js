import { createStore } from "framework7";
import StoreUser from "./store-user.js";
import StoreBackApi from "./store-back-api.js";
const store = createStore({
  state: {
    dummy: [],
    user: StoreUser.entity,
    backend: StoreBackApi.entity,
  },
  getters: {
    dummy({ state }) {
      return state.dummy;
    },
    user: StoreUser.get,
    backend: StoreBackApi.get,
  },
  actions: {
    dummy({ state }, product) {
      state.dummy = [...state.dummy, product];
    },
    userManager_set: StoreUser.set,
    userManager_updateUser: StoreUser.updateUser,
    userManager_updateUserInfo: StoreUser.updateUserInfo,
    userManager_clearUser: StoreUser.clearUser,
    userManager_reset: StoreUser.reset,
    userManager_setFreshRegistry: StoreUser.setFreshRegistry,
    backend_set: StoreBackApi.set,
    backend_clear: StoreBackApi.clear,
  },
});
export default store;
