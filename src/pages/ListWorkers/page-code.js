import Logger from "/lib/Logger";
import { mock_workers } from "/data/mock-workers";
import { categories } from "/data/index.js";
import "./style.css";
const Page = (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store },
  $render
) => {
  let categoryName =
    categories.filter((item) => item.id == props.id)[0].name ?? "";

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
    values: {
      categoryName,
    },
    mock: {
      workers: mock_workers,
    },
  };
};

export default Page;
