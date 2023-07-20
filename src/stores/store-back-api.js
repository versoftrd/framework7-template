/**
 * Template for Stores of Framework7
 * Name convention: store-{function}.js
 */
const StoreBackApi = (function () {
  const entity = {
    context: {
      isTokenExpired: true,
    },
    body: {
      token: "",
    },
  };

  function get({ state }) {
    return state.backend;
  }
  function set({ state }, newElement) {
    state.backend = state.backend;
    state.backend.context.isTokenExpired = false;
    state.backend.body.token = newElement;
  }
  function update({ state }, newElement) {
    state.backend = { ...state.backend, ...newElement };
  }

  function clear({ state }) {
    state.backend = state.backend;
    state.backend = entity;
  }

  return {
    entity,
    get,
    set,
    update,
    clear,
  };
})();
export default StoreBackApi;
