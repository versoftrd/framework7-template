/**
 * Template for Stores of Framework7
 * Name convention: store-{function}.js
 */
const StoreFunction = (function () {
  const entity = {
    context: {},
    body: {},
  };

  function get({ state }) {
    return state.name;
  }
  function set({ state }, newElement) {
    state.name = newElement;
  }
  function update({ state }, newElement) {
    state.name = { ...state.name, ...newElement };
  }

  return {
    entity,
    get,
    set,
    update,
  };
})();
export default StoreFunction;
