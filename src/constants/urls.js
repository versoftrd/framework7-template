export const URLS = {
  login: "/login/",
  home: "/home/",
  transition: "/transition/",
  welcomeClient: "/welcome-client/",
  welcomeWorker: "/welcome-worker/",
  registerClient: "/register-client/",
  registerWorker: "/register-worker/",
  registerChoices: "/register-choices/",
};

export const CORE_BACKEND_URLS = {
  base: "http://localhost:8080/posicionaterd/api/",
  addUser: "add/users",
  login: "login",
  getUser: "user-by-firebase/{id}",
  firstLogin: "user-first-login/{id}",
  addServicesWorkers: "add-services/{id}",
  addWorkerPortafolioImage: "add-worker-images/{id}",
  getWorkerPortafolioImages: "workers-portafolio/{id}",
  deleleteWorkerPortafolioImage: "delete/workers_portafolio/{id}",
};

export const BACKEND_CRED = {
  username: "admin",
  password: "Admin123!",
};

export const HTTP_METHODS = {
  get: "GET",
  post: "POST",
};
