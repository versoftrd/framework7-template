import { prop } from "dom7";
import Logger from "/lib/Logger";

export default (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store }
) => {
  const MAX_LENGTH_DESCRIPTION = 74;
  const resourcesPath = "/assets/images";
  const resources = {
    iconFavorites: "/icons/yellow/user.png",
    iconPlusFeatured: "/icons/black/plus.png",
    iconPlus: "/icons/yellow/plus.png",
    iconStarts: "star",
  };

  const xclass = {
    borderfeatured: "image-border-featured",
    borderNormal: "image-border-normal",
    starFeaturedColor: "star-color-featured",
  };

  let description =
    props.description.length > MAX_LENGTH_DESCRIPTION
      ? props.description.substring(0, MAX_LENGTH_DESCRIPTION - 1) + " ..."
      : props.description;

  return () => (
    <li class={props.feature ? "featured" : ""}>
      <div
        class={
          "feat_small_icon " +
          (props.feature ? xclass.borderfeatured : xclass.borderNormal)
        }
      >
        <img
          src={
            props.image !== "" || props.image == null
              ? props.image
              : resourcesPath + resources.iconFavorites
          }
          alt=""
          title=""
        />
      </div>
      <div class="feat_small_details">
        <h4>
          <a href={props.url}>{props.title}</a>
        </h4>
        <a href={props.url}>{description}</a>
        <div class="worker-list-rating">
          <i
            class={
              "material-icons-outlined " +
              (props.feature ? xclass.starFeaturedColor : "main-color")
            }
          >
            star
          </i>
          <span>{props.rating}</span>
        </div>
      </div>
      <span class="plus_icon">
        <a href="#">
          <img
            src={
              props.feature
                ? resourcesPath + resources.iconPlusFeatured
                : resourcesPath + resources.iconPlus
            }
            alt=""
            title=""
          />
        </a>
      </span>
    </li>
  );
};
