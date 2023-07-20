import RouteInit from "./route-init.js";
import RouteHome from "./route-home.js";

import homy from "/pages/home.f7";
var routes = [
  {
    path: "/",
    async: function (params) {
      RouteInit.evaluate(params);
    },
  },
  {
    path: "/login/",
    async: function (params) {
      RouteLogin.evaluate(params);
    },
  },
  {
    path: "/home/",
    async: function (params) {
      RouteHome.evaluate(params);
    },
  },
  {
    path: "/logout/",
    redirect: function (params) {
      RouteLogout.evaluate(params);
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
