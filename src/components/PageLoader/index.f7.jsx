import Logger from "/lib/Logger";

export default (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store }
) => {
  return () => (
    <div class="page-loader">
      <div class="preloader preloader-large color-main"></div>
    </div>
  );
};
