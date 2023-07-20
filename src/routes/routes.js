import RouteInit from "./route-init.js";
import RouteTransition from "./route-transition.js";
import NotFoundPage from "/pages/404.f7";
import RouteLogin from "./route-login.js";
import RouteHome from "./route-home.js";
import RouteRegister from "./router-register.js";
import RouteListWorkers from "./route-list-workers.js";
import RouteWorkerProfile from "./route-worker-profile.js";
import RouteLogout from "./route-logout.js";
import RouteWelcomeClient from "./route-welcome-client.js";
import RouteWorkerPortafolio from "./route-worker-portafolio.js";
import RouteWorkerProfilePicture from "./route-worker-profile-picture.js";
import homy from "/pages/home.f7";
var routes = [
  {
    path: "/",
    async: function (params) {
      RouteInit.evaluate(params);
    },
  },
  {
    path: "/transition/",
    async: function (params) {
      RouteTransition.evaluate(params);
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
    path: "/register-choices/",
    async: function (params) {
      RouteRegister.evaluateChoices(params);
    },
  },
  {
    path: "/register-worker/",
    async: function (params) {
      RouteRegister.evaluateWorker(params);
    },
  },
  {
    path: "/register-client/",
    async: function (params) {
      RouteRegister.evaluateClient(params);
    },
  },
  {
    path: "/list-workers/:id",
    async: function (params) {
      RouteListWorkers.evaluate(params);
    },
  },
  {
    path: "/workers-profile/:id",
    async: function (params) {
      RouteWorkerProfile.evaluate(params);
    },
  },
  {
    path: "/worker-portafolio/",
    async: function (params) {
      RouteWorkerPortafolio.evaluate(params);
    },
  },
  {
    path: "/worker-profile-picture/",
    async: function (params) {
      RouteWorkerProfilePicture.evaluate(params);
    },
  },
  {
    path: "/welcome-client/",
    async: function (params) {
      RouteWelcomeClient.evaluate(params);
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
