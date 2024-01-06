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
  <div class="player-area player-1-area">Player 1</div>
  <div class="player-area player-2-area">Player 2</div>
  <div class="district-area footlight-area">Footlight</div>
  <div class="district-area waterfront-area">Waterfront</div>
  <div class="district-area canal-area">Canal</div>
`;

/* const footer = document.getElementById('footer');
footer.innerHTML = `
  <span>v ${APP_VERSION}</span>
`; */

