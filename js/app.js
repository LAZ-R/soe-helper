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
      <span>content</span>
    </div>
  </div>
  <div class="player-area player-2-area">
    <div class="area-title"><span>JOUEUR 2</span></div>
    <div class="area-content">
      <span>content</span>
    </div>
  </div>
  <div class="district-area footlight-area">
    <div class="area-title"><span>FOOTLIGHT</span></div>
    <div class="area-content">
      <span>content</span>
    </div>
  </div>
  <div class="district-area waterfront-area">
    <div class="area-title"><span>WATERFRONT</span></div>
    <div class="area-content">
      <span>content</span></div>
  </div>
  <div class="district-area canal-area">
    <div class="area-title"><span>CANAL</span></div>
    <div class="area-content">
      <span>content</span>
    </div>
  </div>
`;

/* const footer = document.getElementById('footer');
footer.innerHTML = `
  <span>v ${APP_VERSION}</span>
`; */

