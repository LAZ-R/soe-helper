import { setStorage } from "./storage/storage.js";
import { setDocumentHeight, setHTMLTitle } from "./utils/utils.js";
import { APP_NAME, APP_VERSION } from "../properties.js";
import { requestWakeLock } from "../wakeLock.js";

/* ############################################################################
--------------------------------- CONSTANTES ---------------------------------
############################################################################ */


/* ############################################################################
---------------------------------- FONCTIONS ----------------------------------
############################################################################ */

// INTERACTIONS UTILISATEUR -------------------------------

const setTriStateButton = (button) => {
  if (button.classList.contains('available')) {
    button.classList.replace('available', 'unlocked');
  } else if (button.classList.contains('unlocked')) {
    button.classList.replace('unlocked', 'packed');
  } else if (button.classList.contains('packed')) {
    button.classList.replace('packed', 'available');
  }
}

export const onButtonClick = (buttonId) => {
  console.log(buttonId);
  const button = document.getElementById(buttonId);
  switch (buttonId) {
    /* ============================= JOUEUR 1 ============================= */

    case "player1PackedButton" :
      setTriStateButton(button);
      break;

    case "player1SwordButton":
      setTriStateButton(button);
      break;

    case "player1RayGunButton":
      setTriStateButton(button);
      break;

    case "player1ArniesButton":
      setTriStateButton(button);
      break;

    case "player1ServantButton":
      break;

    /* ============================= JOUEUR 2 ============================= */

    case "player2PackedButton":
      setTriStateButton(button);
      break;

    case "player2SwordButton":
      setTriStateButton(button);
      break;

    case "player2RayGunButton":
      setTriStateButton(button);
      break;

    case "player2ArniesButton":
      setTriStateButton(button);
      break;

    case "player2ServantButton":
      break;
  
    /* ============================= FOOTLIGHT ============================= */

    case "footlightDoor1Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;

        const door2Button = document.getElementById('footlightDoor2Button');
        door2Button.classList.replace('disabled', 'available');
        door2Button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;

        const beastAreaButton = document.getElementById('footlightBeastAreaButton');
        beastAreaButton.classList.replace('disabled', 'available');
        beastAreaButton.innerHTML = `<img src="./medias/images/soe/beast.svg" />`;

        const portalButton = document.getElementById('footlightPortalButton');
        portalButton.classList.replace('disabled', 'available');
        portalButton.innerHTML = `<img src="./medias/images/soe/portal.svg" />`;
      }
      break;

    case "footlightDoor2Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;

        const door3Button = document.getElementById('footlightDoor3Button');
        door3Button.classList.replace('disabled', 'available');
        door3Button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;
      }
      break;

    case "footlightDoor3Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;
      } 
      break;

    case "footlightBeastAreaButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      }
      break;

    case "footlightPortalButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      }
      break;
  
    /* ============================ WATERFRONT ============================ */
    case "waterfrontDoor1Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;

        const door2Button = document.getElementById('waterfrontDoor2Button');
        door2Button.classList.replace('disabled', 'available');
        door2Button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;

        const beastAreaButton = document.getElementById('waterfrontBeastAreaButton');
        beastAreaButton.classList.replace('disabled', 'available');
        beastAreaButton.innerHTML = `<img src="./medias/images/soe/beast.svg" />`;

        const portalButton = document.getElementById('waterfrontPortalButton');
        portalButton.classList.replace('disabled', 'available');
        portalButton.innerHTML = `<img src="./medias/images/soe/portal.svg" />`;
      }
      break;

    case "waterfrontDoor2Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;

        const door3Button = document.getElementById('waterfrontDoor3Button');
        door3Button.classList.replace('disabled', 'available');
        door3Button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;
      }
      break;

    case "waterfrontDoor3Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;
      } 
      break;

    case "waterfrontBeastAreaButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      }
      break;

    case "waterfrontPortalButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      }
      break;

    /* =============================== CANAL =============================== */
    case "canalDoor1Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;

        const door2Button = document.getElementById('canalDoor2Button');
        door2Button.classList.replace('disabled', 'available');
        door2Button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;

        const beastAreaButton = document.getElementById('canalBeastAreaButton');
        beastAreaButton.classList.replace('disabled', 'available');
        beastAreaButton.innerHTML = `<img src="./medias/images/soe/beast.svg" />`;

        const portalButton = document.getElementById('canalPortalButton');
        portalButton.classList.replace('disabled', 'available');
        portalButton.innerHTML = `<img src="./medias/images/soe/portal.svg" />`;
      }
      break;

    case "canalDoor2Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;

        const door3Button = document.getElementById('canalDoor3Button');
        door3Button.classList.replace('disabled', 'available');
        door3Button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;
      }
      break;

    case "canalDoor3Button":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
        button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;
      } 
      break;

    case "canalBeastAreaButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      }
      break;

    case "canalPortalButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      }
      break;

    default:
      break;
  }
}
window.onButtonClick = onButtonClick;

// GÉNÉRATION DOM -----------------------------------------


/* ############################################################################
---------------------------------- EXECUTION ----------------------------------
############################################################################ */

// Auto ---------------------------------------------------
setStorage();
setDocumentHeight();
await requestWakeLock();

// Manuelle -----------------------------------------------

setHTMLTitle(APP_NAME);

/* const header = document.getElementById('header');
header.innerHTML = `
  <span>${APP_NAME}</span>
`; */

const main = document.getElementById('main');
main.innerHTML = `
  <div class="rounds-area actual-round-area">vague actuelle</div>
  <div class="rounds-area next-round-area">vague suivante</div>
  <div class="central-area">Centre</div>
  <div class="player-area player-1-area">
    <div class="area-title"><span>JOUEUR 1</span></div>
    <div class="area-content">
      <div id="player1PackedButton" class="round-button available" onclick="onButtonClick('player1PackedButton')"><img src="./medias/images/font-awsome/star-regular.svg" /></div>
      <div id="player1SwordButton" class="round-button available" onclick="onButtonClick('player1SwordButton')"><img src="./medias/images/soe/sword.svg" /></div>
      <div id="player1RayGunButton" class="round-button available" onclick="onButtonClick('player1RayGunButton')"><img src="./medias/images/soe/ray-gun.svg" /></div>
      <div id="player1ArniesButton" class="round-button available" onclick="onButtonClick('player1ArniesButton')"><img src="./medias/images/soe/arnie.svg" /></div>
      <div id="player1ServantButton" class="round-button disabled" onclick="onButtonClick('player1ServantButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
  <div class="player-area player-2-area">
    <div class="area-title"><span>JOUEUR 2</span></div>
    <div class="area-content">
      <div id="player2PackedButton" class="round-button available" onclick="onButtonClick('player2PackedButton')"><img src="./medias/images/font-awsome/star-regular.svg" /></div>
      <div id="player2SwordButton" class="round-button available" onclick="onButtonClick('player2SwordButton')"><img src="./medias/images/soe/sword.svg" /></div>
      <div id="player2RayGunButton" class="round-button available" onclick="onButtonClick('player2RayGunButton')"><img src="./medias/images/soe/ray-gun.svg" /></div>
      <div id="player2ArniesButton" class="round-button available" onclick="onButtonClick('player2ArniesButton')"><img src="./medias/images/soe/arnie.svg" /></div>
      <div id="player2ServantButton" class="round-button disabled" onclick="onButtonClick('player2ServantButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
  <div class="district-area footlight-area">
    <div class="area-title"><span>FOOTLIGHT</span></div>
    <div class="area-content">
      <div class="line"></div>
      <div id="footlightDoor1Button" class="round-button available" onclick="onButtonClick('footlightDoor1Button')"><img src="./medias/images/font-awsome/door-closed-solid.svg" /></div>
      <div id="footlightDoor2Button" class="round-button disabled" onclick="onButtonClick('footlightDoor2Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="footlightDoor3Button" class="round-button disabled" onclick="onButtonClick('footlightDoor3Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="footlightBeastAreaButton" class="round-button disabled" onclick="onButtonClick('footlightBeastAreaButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="footlightPortalButton" class="round-button disabled" onclick="onButtonClick('footlightPortalButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
  <div class="district-area waterfront-area">
    <div class="area-title"><span>WATERFRONT</span></div>
    <div class="area-content">
      <div class="line"></div>
      <div id="waterfrontDoor1Button" class="round-button available" onclick="onButtonClick('waterfrontDoor1Button')"><img src="./medias/images/font-awsome/door-closed-solid.svg" /></div>
      <div id="waterfrontDoor2Button" class="round-button disabled" onclick="onButtonClick('waterfrontDoor2Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="waterfrontDoor3Button" class="round-button disabled" onclick="onButtonClick('waterfrontDoor3Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="waterfrontBeastAreaButton" class="round-button disabled" onclick="onButtonClick('waterfrontBeastAreaButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="waterfrontPortalButton" class="round-button disabled" onclick="onButtonClick('waterfrontPortalButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
  <div class="district-area canal-area">
    <div class="area-title"><span>CANAL</span></div>
    <div class="area-content">
      <div class="line"></div>
      <div id="canalDoor1Button" class="round-button available" onclick="onButtonClick('canalDoor1Button')"><img src="./medias/images/font-awsome/door-closed-solid.svg" /></div>
      <div id="canalDoor2Button" class="round-button disabled" onclick="onButtonClick('canalDoor2Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="canalDoor3Button" class="round-button disabled" onclick="onButtonClick('canalDoor3Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="canalBeastAreaButton" class="round-button disabled" onclick="onButtonClick('canalBeastAreaButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="canalPortalButton" class="round-button disabled" onclick="onButtonClick('canalPortalButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
`;

/* const footer = document.getElementById('footer');
footer.innerHTML = `
  <span>v ${APP_VERSION}</span>
`; */

