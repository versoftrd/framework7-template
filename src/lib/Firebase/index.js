/**
 * Auth Firebase Providers
 * Autor: Versoft
 *
 * Descripcion:
 * - El proposito de este modulo es autenticacion con proveedores
 *   usando Firebase
 *
 * Notas
 * npm install firebase
 */
import Logger from "/lib/Logger";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Firebase = (function () {
  "use strict";
  // Constantes
  var __googleProvider;
  var __facebookProvider;
  var auth;
  var db;

  // Inicializa variables de Firebase
  var initFirebase = function () {
    const firebaseConfig = {
      apiKey: "AIzaSyBvn7_BewkdszRYRANQdt1tutcWwauKEck",
      authDomain: "posicionaterd-47231.firebaseapp.com",
      projectId: "posicionaterd-47231",
      storageBucket: "posicionaterd-47231.appspot.com",
      messagingSenderId: "170333264123",
      appId: "1:170333264123:web:1152cb969e11e8c709785e",
    };
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    __googleProvider = new GoogleAuthProvider();
    //__facebookProvider = new app.auth.FacebookAuthProvider();
    Logger.log("Firebase module loaded");
  };

  // Login con correo
  var login = function (email, password, fnSuccess, fnError) {
    var prm = signInWithEmailAndPassword(auth, email, password)
      .then(function (user) {
        fnSuccess(user);
        Logger.log(user);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        fnError(error);
        Logger.log(errorMessage);
      });
  };

  // Registro con correo
  var register = function (email, password, data, fnSuccess, fnError) {
    var prm = createUserWithEmailAndPassword(auth, email, password)
      .then(function (user) {
        Logger.log(user);
        mUpdateProfile(data, user, fnSuccess, fnError);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Logger.log(errorMessage);
        fnError(error);
      });
  };

  // Actualiza perfil solo data
  var mUpdateProfile = function (data, user, fnSuccess, fnError) {
    var user = auth.currentUser;
    var prm = updateProfile(user, {
      displayName: data.name,
      phoneNumber: data.phone,
    })
      .then(function () {
        Logger.log("firebase:Profile updated");
        fnSuccess(auth.currentUser, data);
      })
      .catch(function (error) {
        Logger.log(error.message);
        fnError(error);
      });
  };

  // Logout
  var logOut = function (successFn, errorFn) {
    signOut(auth)
      .then(function () {
        Logger.log("firebase:logged out");
        if (typeof successFn == "function") {
          successFn();
        }
      })
      .catch(function (error) {
        Logger.log(error.message);
        if (typeof successFn == "function") {
          errorFn();
        }
      });
  };

  //Status Auth Change
  var onChangeAuthStatus = function (fnSuccess, fnError) {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        Logger.log("firebase:User logged");
        fnSuccess(user);
        return true;
      } else {
        Logger.log("firebase:Not user logged");
        fnError();
        return false;
      }
    });
  };

  //Retornar usuario actual
  var getCurrentUser = function () {
    if (auth.currentUser) {
      let user = {
        displayName: auth.currentUser.displayName,
        image: auth.currentUser.photoURL,
        email: auth.currentUser.email,
      };
      return user;
    } else {
      let user = {
        displayName: "Hola!",
        image: "",
        email: "",
      };
      return user;
    }
  };

  // Login con Facebook
  var facebookLogin = function (fnSuccess, fnError) {
    auth.signInWithRedirect(__facebookProvider);
    var prm = auth
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          var token = result.credential.accessToken;
        }
        var user = result.user;
        Logger.log(user);
        fnSuccess(user);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        Logger.log(errorMessage);
        fnError(error);
      });
  };

  // Login con Google
  var googleLogin = function (fnSuccess, fnError) {
    let prm = signInWithPopup(auth, __googleProvider)
      .then(function (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        fnSuccess(user);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        Logger.log(errorMessage);
        fnError(error);
      });
  };

  //Database Firestore Functions
  // const dbfAddDocument = (doc, collect, fnSuccess, fnError) => {
  //     db.collection(collect).add({
  //         doc
  //     })
  //     .then((docRef) => {
  //         logger.log(docRef);
  //         logger.log("firebase:Document written with ID: " + docRef.id);
  //         fnSuccess(docRef);
  //     })
  //     .catch((error) => {
  //         logger.log("firebase:Error adding document: " + error);
  //         fnError();
  //     });
  // }

  //Database Firestore Query
  // const dbfGetDocument = (collect, query, fnSuccess, fnError) => {
  //     db.collection(collect).where("doc." + query.field, query.operator, query.value)
  //     .get()
  //     .then((querySnapshot) => {
  //         logger.log(querySnapshot)
  //         querySnapshot.forEach((docx) => {
  //             logger.log("firebase:" + docx.id);
  //             fnSuccess(docx);
  //         });
  //     })
  //     .catch((error) => {
  //         logger.log("firebase:Error getting documents: " + error);
  //         fnError(error);
  //     });
  // }

  return {
    onChangeAuthStatus,
    initFirebase,
    facebookLogin,
    googleLogin,
    login,
    register,
    updateProfile,
    logOut,
    getCurrentUser,
  };
})();

export default Firebase;

Firebase.initFirebase();
