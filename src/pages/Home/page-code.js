import Logger from "/lib/Logger";
import { USER_ROLES } from "/constants/";
const Page = (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store },
  $render,
  values
) => {
  $on("pageInit", (e, page) => {
    Logger.info({ path: page.name, body: "pageInit" });
    Logger.state({ body: $store.state });
    values.currentUser.isRoleClient =
      $store.state.user.body.userInfo.roleId == USER_ROLES.client;
    Logger.log("User role: " + $store.state.user.body.userInfo.roleId);
    $update();
  });
  return $render;
};

export default Page;
