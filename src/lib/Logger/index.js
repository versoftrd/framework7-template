const logEnabled = import.meta.env.DEV;

const Logger = {
  log: (params) => {
    if (logEnabled) {
      if (typeof params == "object") {
        console.log(params);
      } else {
        console.log(
          `%c➛ ${params}`,
          "color: gray; font-size: 13px; font-weight: bold"
        );
      }
    }
  },
  state: (params) => {
    if (logEnabled) {
      console.log(
        `%c☂️ Current state:`,
        "color: black; font-size: 13px; font-weight: bold"
      );
      console.log(params.body);
    }
  },
  info: (params) => {
    if (logEnabled) {
      console.log(
        `%c👀 ${params.path} : ${params.body}`,
        "color: gray; font-size: 13px; font-weight: bold"
      );
    }
  },
  error: (params) => {
    if (logEnabled) {
      console.log(
        `%c💥 Error: ${params}`,
        "color: red; font-size: 13px; font-weight: bold"
      );
      if (typeof params == "object") {
        console.log(params);
      }
    }
  },
  request: (params) => {
    if (logEnabled) {
      console.log(
        `%c🚀 Request: ${params.path}`,
        "color: green; font-size: 13px; font-weight: bold"
      );
      console.log(params.body);
    }
  },
  responseSuccess: (params) => {
    if (logEnabled) {
      console.log(
        `%c🥳 Response: ${params.code} ${params.path}`,
        "color: green; font-size: 13px; font-weight: bold"
      );
      if (params.body != null) {
        console.log(params.body);
      }
    }
  },
  responseError: (params) => {
    if (logEnabled) {
      console.log(
        `%c💥 Response: ${params.code} ${params.path}`,
        "color: red; font-size: 13px; font-weight: bold"
      );
    }
  },
  noResponse: (params) => {
    if (logEnabled) {
      console.log(
        `%c⚠️No response from: ${params.path}`,
        "color: yellow; font-size: 13px; font-weight: bold"
      );
    }
  },
};

export default Logger;
