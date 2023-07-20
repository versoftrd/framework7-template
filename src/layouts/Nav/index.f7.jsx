import Logger from "/lib/Logger";

export default (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store }
) => {
  return () => (
    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">
        <div class="left">
          <a href="#" class="link back">
            <i class="icon icon-back"></i>
            <span class="if-not-md"></span>
          </a>
        </div>
        <div class="title">{props.title}</div>
        {/* <div class="left">
          <a href="#" class="link icon-only panel-open" data-panel="left">
            <i class="icon f7-icons if-not-md">menu</i>
            <i class="icon material-icons if-md">menu</i>
          </a>
        </div> */}
        <div class="title sliding"></div>
        <div class="right">
          <a href="#" class="link icon-only panel-open" data-panel="right">
            <i class="icon f7-icons if-not-md">menu</i>
            <i class="icon material-icons if-md">menu</i>
          </a>
        </div>
      </div>
    </div>
  );
};
