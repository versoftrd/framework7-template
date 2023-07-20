import Logger from "/lib/Logger";

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

  const initialize = () => {};
  return {
    render: $render,
    events: {},
    functions: {},
  };
};

export default Page;
