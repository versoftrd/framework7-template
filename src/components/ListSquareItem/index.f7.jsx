import Logger from "/lib/Logger";
import "./style.css";
export default (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store }
) => {
  return () => (
    <li class={props.bgcolor}>
      {props.panel == null ? (
        <a href={props.url}>
          <i class={`material-icons-outlined list-icon ${props.xclass}`}>
            {props.icon}
          </i>

          <span class={props.textcolor}>{props.text}</span>
        </a>
      ) : (
        <a href={props.url} class="panel-open" data-panel={props.panel}>
          <i class={`material-icons-outlined list-icon ${props.xclass}`}>
            {props.icon}
          </i>

          <span class={props.textcolor}>{props.text}</span>
        </a>
      )}
    </li>
  );
};
