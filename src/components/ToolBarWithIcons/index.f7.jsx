import Logger from "/lib/Logger";

export default (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store, $emit }
) => {
  const onClickButton = (id) => {
    $emit("onclick", id);
  };
  return () => (
    <div class="toolbar toolbar-bottom tabbar-icons">
      <div class="toolbar-inner">
        {props.items.map((button) => (
          <a class="link" onClick={() => onClickButton(button.id)}>
            <i class="icon material-icons-outlined main-color">{button.icon}</i>
            <span class="tabbar-label">{button.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
