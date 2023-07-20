import Logger from "/lib/Logger";
import {
  MS_WORKER_PORTAFOLIO,
  CORE_BACKEND_URLS,
  HTTP_METHODS,
  GENERIC_MESSAGES,
  CONFIG,
} from "/constants";
import { CoreApiCall } from "/backend/core-api.js";
import UserManager from "/js/user-manager.js";
const Page = (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store, $el, $ref },
  $render
) => {
  const DOM = {
    fileInputPortafolio: ".file-portafolio-image",
    previewElements: ".portafolio-hidden-block",
  };

  let currentUser = $ref({});

  const toolbar = $ref([]);
  const loadRetryBlock = $ref(false);
  let toolbarIds = {
    save: "",
    addImage: "",
  };

  $on("pageInit", (e, page) => {
    Logger.info({ path: page.name, body: "pageInit" });
    Logger.state({ body: $store.state });
    toolbarIds.save = `${page.name}-addImage`;
    toolbarIds.addImage = `${page.name}-save`;
    initialize(page);
  });

  $on("pageBeforeIn", (e, page) => {
    currentUser = UserManager.getCurrentUser($store);
    getImages();
  });

  const initialize = (page) => {
    toolbar.value = [
      {
        id: toolbarIds.addImage,
        icon: "add_photo_alternate",
        label: "Agregar imagen",
        useSlot: true,
      },
      {
        id: toolbarIds.save,
        icon: "save",
        label: "Guardar",
        useSlot: false,
      },
    ];
  };

  const getImages = () => {
    $f7.dialog.preloader();
    // const userId = cu;
    // const url = CORE_BACKEND_URLS.getWorkerPortafolioImages.replace(
    //   "{id}",
    //   userId
    // );
    // CoreApiCall({
    //   service: {
    //     method: HTTP_METHODS.get,
    //     url,
    //     body: null,
    //   },
    //   done: doneGetImages,
    //   failed: failedGetImages,
    //   $store,
    // });
  };

  const doneGetImages = (data) => {
    if (data.success) {
      loadRetryBlock.value = false;
      values.portafolio = data.data.map((item) => {
        return { id: item.id, url: item.image };
      });
      console.log("Tes", values.portafolio);
      $update();
    } else {
      loadRetryBlock.value = true;
    }
    $f7.dialog.close();
  };

  const failedGetImages = (data) => {
    loadRetryBlock.value = true;
    $f7.dialog.close();
  };

  const toolbarOnClick = (params) => {
    switch (params.detail) {
      case toolbarIds.addImage:
        $el.value.find(DOM.fileInputPortafolio).click();
        break;
      case toolbarIds.save:
        savePicture();
        break;
    }
  };

  const addImage = () => {
    $el.value.find(DOM.fileInputPortafolio).click();
  };

  const addPreviewNewImage = (params) => {
    values.previewImage.push(params.detail);
    $update();
  };

  const removeImageFromPreview = (params) => {
    $f7.dialog.confirm(
      "¿Seguro que quiere eliminar la imagen?",
      "Eliminar imagen",
      () => {
        values.previewImage = values.previewImage.filter(
          (x) => x.id !== params.detail.id
        );
        $update();
      },
      () => {}
    );
  };

  const removeImageById = (params) => {
    $f7.dialog.confirm(
      "¿Seguro que quiere eliminar la imagen?",
      "Eliminar imagen",
      () => {
        deletePicture(params.detail.id);
      },
      () => {}
    );
  };

  const savePicture = () => {
    if (values.previewImage.length == 0) {
      $f7.dialog.alert(MS_WORKER_PORTAFOLIO.noImages);
    } else {
      $f7.dialog.preloader();
      const userId = $store.state.user.body.userInfo.id;
      const url = CORE_BACKEND_URLS.addWorkerPortafolioImage.replace(
        "{id}",
        userId
      );
      const body = values.previewImage.map((item) => {
        return { image: item.url };
      });
      CoreApiCall({
        service: {
          method: HTTP_METHODS.post,
          url,
          body,
        },
        done: doneSaveImage,
        failed: failed,
        $store,
      });
    }
  };

  const doneSaveImage = (reg) => {
    getImages();
    $f7.toast.show({
      text: MS_WORKER_PORTAFOLIO.imagesAdded,
      closeTimeout: CONFIG.TOAST_DURATION,
    });
    dispose();
    $f7.dialog.close();
  };

  const failed = (reg) => {
    $f7.dialog.close();
    $f7.dialog.alert(GENERIC_MESSAGES.error);
  };

  const deletePicture = (id) => {
    $f7.dialog.preloader();
    const url = CORE_BACKEND_URLS.deleleteWorkerPortafolioImage.replace(
      "{id}",
      id
    );
    CoreApiCall({
      service: {
        method: HTTP_METHODS.get,
        url,
        body: null,
      },
      done: (reg) => {
        doneDeleteImage(reg, id);
      },
      failed: failed,
      $store,
    });
  };

  const doneDeleteImage = (reg, id) => {
    values.portafolio = values.portafolio.filter((x) => x.id !== id);
    $update();
    $f7.toast.show({
      text: MS_WORKER_PORTAFOLIO.imagesDeleted,
      closeTimeout: CONFIG.TOAST_DURATION,
    });
    dispose();
    $f7.dialog.close();
  };

  const dispose = () => {
    values.previewImage = [];
    $(DOM.previewElements).hide();
  };
  return {
    render: $render,
    events: {
      savePicture,
      removeImageById,
      removeImageFromPreview,
      addPreviewNewImage,
      toolbarOnClick,
      addImage,
      getImages,
    },
    values: {
      currentUser,
    },
    loadRetryBlock,
    toolbar,
    functions: {},
  };
};

export default Page;
