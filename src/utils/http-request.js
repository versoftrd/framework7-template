import Logger from "/lib/Logger";
import { HTTP_METHODS } from "/constants";
export const HttpRequest = async (params) => {
  let url = params.url;
  let body = params.payload;

  if (params.method == HTTP_METHODS.get) {
    if (params.parameters != null) {
      url += "?";
      const parameters = new URLSearchParams(Object.entries(params.parameters));
      url += parameters.toString();
    }
    body = url;
  }

  let headers = params.headers ?? { Accept: "application/json" };
  Logger.log(headers);
  Logger.request({
    path: params.url,
    body: body,
  });

  let pr = fetch(url, {
    include: "credentials",
    method: params.method,
    body: params.payload ? JSON.stringify(params.payload) : null,
    headers,
  });
  pr.catch((error) => {
    Logger.error(error);
  });
  pr.then((response) => {
    Logger.responseSuccess({
      path: params.url,
      code: response.status,
      body: null,
    });
    return response.clone().json();
  })
    .then((data) => {
      Logger.log(data);
    })
    .catch((error) => {
      Logger.error(error);
    });
  return pr;
};
