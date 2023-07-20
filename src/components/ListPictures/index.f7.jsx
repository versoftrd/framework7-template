import Logger from "/lib/Logger";
import "./style.css";
export default (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store, $emit }
) => {
  const removeImage = (e) => {
    $emit("removeImage", { id: e.target.id });
  };
  return () => (
    <div class="tab active">
      <ul class="photo_gallery_13">
        {props.items.map((pic) => (
          <li>
            <a
              rel="gallery-3"
              href="#"
              title="Photo"
              class="swipebox"
              onClick={(e) => removeImage(e)}
            >
              <div class="badge color-red badge-remove">X</div>
              <img id={pic.id} src={pic.url} alt="image" />
            </a>
          </li>
        ))}
        <div class="clearleft"></div>
      </ul>
    </div>
  );
};
