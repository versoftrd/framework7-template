import {
  CORE_BACKEND_URLS,
  BACKEND_CRED,
  HTTP_METHODS,
  GENERIC_MESSAGES,
} from "/constants";
import { HttpRequest, sleep } from "/utils";
import Logger from "/lib/Logger";

const STORE_PREFIX = "backend_";
const constants = {
  STORE_ADD: STORE_PREFIX + "set",
  STORE_CLEAR: STORE_PREFIX + "clear",
  SLEEP_FIRST_TIME: 1000,
};

export const getCoreBackendToken = (params) => {
  const { done, failed, $store } = params;
  let pr = HttpRequest({
    url: CORE_BACKEND_URLS.base + CORE_BACKEND_URLS.login,
    parameters: BACKEND_CRED,
    method: HTTP_METHODS.get,
  });
  pr.catch((error) => {
    failed(error);
  });
  pr.then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  })
    .then((data) => {
      $store.dispatch(constants.STORE_ADD, data.JWT);
      done(data, params);
    })
    .catch((error) => {
      failed(error);
    });
};

export const prepareBackRequest = async ($store) => {
  let token = $store.state.backend;
  if (typeof token == "object") {
    if (token.context.isTokenExpired) {
      try {
        const prToken = await HttpRequest({
          url: CORE_BACKEND_URLS.base + CORE_BACKEND_URLS.login,
          parameters: BACKEND_CRED,
          method: HTTP_METHODS.get,
        });
        if (prToken.ok) {
          const json = prToken.json();
          $store.dispatch(constants.STORE_ADD, json.JWT);
          await sleep(constants.SLEEP_FIRST_TIME);
          return true;
        } else {
          throw new Error(`Error HTTP: ${prToken.status}`);
        }
      } catch (error) {
        Logger.error(error);
      }
    }
  }
};

export const CoreApiCall = ({ service, done, failed, $store }) => {
  const token = $store.state.backend.body.token;
  const pr = HttpRequest({
    url: CORE_BACKEND_URLS.base + service.url,
    method: service.method,
    payload: service.body,
    headers: {
      "X-Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
      Accept: "*/*",
    },
  });

  pr.catch((error) => {});

  pr.then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  })
    .then((data) => {
      if (data.success) {
        done(data);
      } else {
        return Promise.reject(data);
      }
    })
    .catch((error) => {
      failed(error.failureMessage ?? GENERIC_MESSAGES.error);
    });
};

export const CoreApiCallAsync = async ({ service, $store }) => {
  const token = $store.state.backend.body.token;
  const pr = HttpRequest({
    url: CORE_BACKEND_URLS.base + service.url,
    method: service.method,
    payload: service.body,
    headers: {
      "X-Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
      Accept: "*/*",
    },
  });
  return await pr.then((response) => response.json());
};
