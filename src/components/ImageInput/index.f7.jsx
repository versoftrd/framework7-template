import Logger from "/lib/Logger";
import { FILE_UPLOAD, CONFIG } from "/constants";
/*
<image-input id="" imageBlock="" @newImageEvent="" buttonClass=""></image-input>
*/
export default (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store, $emit, $el, $onMounted }
) => {
  const DOM = {
    fileInputPortafolio: `file-${props.id}`,
  };
  const initFileInput = () => {
    $el.value.find("." + DOM.fileInputPortafolio).on("change", function (e) {
      const file = e.target.files[0];
      const maxSizeInBytes = CONFIG.MAX_FILE_UPLOAP_MB * 1024 * 1024; // MB Bytes
      if (file.size <= maxSizeInBytes) {
        const reader = new FileReader();
        $f7.dialog.preloader();
        reader.onload = function () {
          let newImage = {
            id: $f7.utils.id(),
            url: reader.result,
          };
          $emit("newImageEvent", newImage);
          if (typeof props.previewelements == "string") {
            $(props.previewelements).show();
          }
          $f7.dialog.close();
        };
        if (file) {
          reader.readAsDataURL(file);
        }
        $f7.dialog.close();
      } else {
        $f7.dialog.alert(FILE_UPLOAD.maxSizeLimit);
      }
    });
  };

  const selectPicture = () => {
    $("." + DOM.fileInputPortafolio).click();
    return false;
  };

  $onMounted(() => {
    initFileInput();
  });

  return () => (
    <div class="">
      <input
        class={DOM.fileInputPortafolio}
        type="file"
        accept="image/*"
        hidden
      />
      <a href="#" class={props.buttonclass} onClick={selectPicture}>
        <slot></slot>
      </a>
    </div>
  );
};
