import Logger from "/lib/Logger";
import Avatar from "/lib/Avatar";
import { takeTheFirstWord } from "/utils";
export default (
  props,
  { $f7, $on, $f7router, $f7route, $update, $, $store }
) => {
  const currentUser = $store.getters.user;
  const placeImageHolder = "";
  const resourceBasePath = "/assets/images/";
  const resources = {
    bgImage: resourceBasePath + "profile-generic.jpg",
  };

  return () => (
    <div class="panel panel-right panel-reveal">
      <div class="user_login_info">
        <div class="user_thumb">
          <img src={resources.bgImage} alt="" title="" />
          <div class="user_details">
            <p>
              Hola,{" "}
              <span>
                {takeTheFirstWord(currentUser.value.body.user.displayName)}
              </span>
            </p>
          </div>
          <div class="user_avatar">
            <img
              src={
                currentUser.value.body.user.photoURL != null
                  ? currentUser.value.body.user.photoURL
                  : Avatar.get({
                      name: currentUser.value.body.user.displayName,
                    })
              }
              alt="User"
              title="User"
            />
          </div>
        </div>
        <nav class="user-nav">
          <ul>
            <li>
              <a href="/home/" class="close-panel">
                <i class="material-icons-outlined main-color">
                  manage_accounts
                </i>
                <span>EDIT PROFILE</span>
              </a>
            </li>
            <li>
              <a href="/logout/" class="close-panel">
                <i class="material-icons-outlined main-color">logout</i>
                <span>LOGOUT</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
