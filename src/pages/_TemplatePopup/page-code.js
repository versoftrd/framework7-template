import Logger from "/lib/Logger";

const Page = (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store },
  $render
) => {
  $f7.on("popupOpen", function (popup) {});
  $f7.on("closePopup", function (popup) {});
  const closePopup = () => {
    $f7router.back();
  };

  return {
    render: $render,
    events: {
      closePopup: closePopup,
    },
  };
};

export default Page;
