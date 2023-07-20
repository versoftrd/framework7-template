import $ from "dom7";
import Framework7, { getDevice } from "framework7/bundle";

// Import F7 Styles
import "framework7/css/bundle";

//Import theme css
//import "../css/theme/style.css";

// Import Icons and App Custom Styles
import "../css/icons.css";
import "../fonts/outlined.css";
import "../css/app.css";

// Import Capacitor APIs
import capacitorApp from "./capacitor-app.js";
// Import Routes
import routes from "/routes/routes.js";
// Import Store
import store from "/stores/store.js";

// Import main app component
import App from "../app.f7";

var device = getDevice();
var app = new Framework7({
  name: "AppName", // App name
  theme: "auto", // Automatic theme detection
  colors: {
    primary: "#fee600",
  },
  darkMode: true,
  el: "#app", // App root element
  component: App, // App main component
  // App store
  store: store,
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.capacitor,
    scrollIntoViewCentered: device.capacitor,
  },
  // Capacitor Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.capacitor) {
        // Init capacitor APIs (see capacitor-app.js)
        capacitorApp.init(f7);
      }
    },
  },
});

//Common components
import ListSquareItem from "/components/ListSquareItem/index.f7.jsx";
Framework7.registerComponent("list-square-item", ListSquareItem);

import Nav from "/layouts/Nav/index.f7.jsx";
Framework7.registerComponent("nav-top", Nav);

import SideRightPanel from "/layouts/SideRightPanel/index.f7.jsx";
Framework7.registerComponent("side-right-panel", SideRightPanel);

import PageLoader from "/components/PageLoader/index.f7.jsx";
Framework7.registerComponent("page-loader", PageLoader);

import ListPictures from "/components/ListPictures/index.f7.jsx";
Framework7.registerComponent("list-pictures", ListPictures);

import ImageInput from "/components/ImageInput/index.f7.jsx";
Framework7.registerComponent("image-input", ImageInput);

import ToolBarWithIcons from "/components/ToolBarWithIcons/index.f7.jsx";
Framework7.registerComponent("toolbar-icons", ToolBarWithIcons);
