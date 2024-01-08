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

const setFirstDoorButton = (button, districtName) => {
  if (button.classList.contains('available')) {
    button.classList.replace('available', 'unlocked');
    button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;

    const line1 = document.getElementById(`${districtName}Line1`);
    line1.style.opacity = .75;

    const door2Button = document.getElementById(`${districtName}Door2Button`);
    door2Button.classList.replace('disabled', 'available');
    door2Button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;

    const beastAreaButton = document.getElementById(`${districtName}BeastAreaButton`);
    beastAreaButton.classList.replace('disabled', 'available');
    beastAreaButton.innerHTML = `<img src="./medias/images/soe/beast.svg" />`;

    const portalButton = document.getElementById(`${districtName}PortalButton`);
    portalButton.classList.replace('disabled', 'available');
    portalButton.innerHTML = `<img src="./medias/images/soe/portal.svg" />`;
  } else if (button.classList.contains('unlocked')) {
    button.classList.replace('unlocked', 'available');
    button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;

    const line1 = document.getElementById(`${districtName}Line1`);
    line1.style.opacity = .25;
    const line2 = document.getElementById(`${districtName}Line2`);
    line2.style.opacity = .25;

    const door2Button = document.getElementById(`${districtName}Door2Button`);
    door2Button.classList.replace('available', 'disabled');
    door2Button.classList.replace('unlocked', 'disabled');
    door2Button.innerHTML = `<img src="./medias/images/font-awsome/lock-solid.svg" />`;

    const door3Button = document.getElementById(`${districtName}Door3Button`);
    door3Button.classList.replace('available', 'disabled');
    door3Button.classList.replace('unlocked', 'disabled');
    door3Button.innerHTML = `<img src="./medias/images/font-awsome/lock-solid.svg" />`;

    const beastAreaButton = document.getElementById(`${districtName}BeastAreaButton`);
    beastAreaButton.classList.replace('available', 'disabled');
    beastAreaButton.classList.replace('unlocked', 'disabled');
    beastAreaButton.innerHTML = `<img src="./medias/images/font-awsome/lock-solid.svg" />`;

    const portalButton = document.getElementById(`${districtName}PortalButton`);
    portalButton.classList.replace('available', 'disabled');
    portalButton.classList.replace('unlocked', 'disabled');
    portalButton.innerHTML = `<img src="./medias/images/font-awsome/lock-solid.svg" />`;
  }
}

const setSecondDoorButton = (button, districtName) => {
  if (button.classList.contains('available')) {
    button.classList.replace('available', 'unlocked');
    button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;
    
    const line2 = document.getElementById(`${districtName}Line2`);
    line2.style.opacity = .75;

    const door3Button = document.getElementById(`${districtName}Door3Button`);
    door3Button.classList.replace('disabled', 'available');
    door3Button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;

    switch (districtName) {
      case 'footlight':
        const jessicaRitualSymbolContainer = document.getElementById('jessicaRitualSymbolContainer');
        jessicaRitualSymbolContainer.classList.replace('ritual-disabled', 'ritual-available');
        break;
      case 'waterfront':
        const floydRitualSymbolContainer = document.getElementById('floydRitualSymbolContainer');
        floydRitualSymbolContainer.classList.replace('ritual-disabled', 'ritual-available');
        break;
      case 'canal':
        const jackRitualSymbolContainer = document.getElementById('jackRitualSymbolContainer');
        jackRitualSymbolContainer.classList.replace('ritual-disabled', 'ritual-available');
        break;
      default:
        break;
    }
  } else if (button.classList.contains('unlocked')) {
    button.classList.replace('unlocked', 'available');
    button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;

    const line2 = document.getElementById(`${districtName}Line2`);
    line2.style.opacity = .25;

    const door3Button = document.getElementById(`${districtName}Door3Button`);
    door3Button.classList.replace('available', 'disabled');
    door3Button.classList.replace('unlocked', 'disabled');
    door3Button.innerHTML = `<img src="./medias/images/font-awsome/lock-solid.svg" />`;
  }
}

const setThirdDoorButton = (button) => {
  if (button.classList.contains('available')) {
    button.classList.replace('available', 'unlocked');
    button.innerHTML = `<img src="./medias/images/font-awsome/door-open-solid.svg" />`;
  } else if (button.classList.contains('unlocked')) {
    button.classList.replace('unlocked', 'available');
    button.innerHTML = `<img src="./medias/images/font-awsome/door-closed-solid.svg" />`;
  } 
}

let completedRituals = 0;

const onButtonClick = (buttonId) => {
  //console.log(buttonId);
  const button = document.getElementById(buttonId);
  switch (buttonId) {

    /* */
    case "neroRitualButton":
      if (document.getElementById('neroRitualSymbolContainer').classList.contains('ritual-available')) {
        document.getElementById('neroRitualSymbolContainer').classList.replace('ritual-available', 'ritual-unlocked');
        completedRituals += 1;
        if (completedRituals == 4) {
          document.getElementById('riftRitualButton').style.display = 'flex';
        }
      }
      break;
    case "jessicaRitualButton":
      if (document.getElementById('jessicaRitualSymbolContainer').classList.contains('ritual-available')) {
        document.getElementById('jessicaRitualSymbolContainer').classList.replace('ritual-available', 'ritual-unlocked');
        completedRituals += 1;
        if (completedRituals == 4) {
          document.getElementById('riftRitualButton').style.display = 'flex';
        }
      }
      break;
    case "floydRitualButton":
      if (document.getElementById('floydRitualSymbolContainer').classList.contains('ritual-available')) {
        document.getElementById('floydRitualSymbolContainer').classList.replace('ritual-available', 'ritual-unlocked');
        completedRituals += 1;
        if (completedRituals == 4) {
          document.getElementById('riftRitualButton').style.display = 'flex';
        }
      }
      break;
    case "jackRitualButton":
      if (document.getElementById('jackRitualSymbolContainer').classList.contains('ritual-available')) {
        document.getElementById('jackRitualSymbolContainer').classList.replace('ritual-available', 'ritual-unlocked');
        completedRituals += 1;
        if (completedRituals == 4) {
          document.getElementById('riftRitualButton').style.display = 'flex';
        }
      }
      break;
    case "riftRitualButton":
      if (document.getElementById('riftRitualSymbolContainer').classList.contains('ritual-available')) {
        document.getElementById('riftRitualSymbolContainer').classList.replace('ritual-available', 'ritual-unlocked');
        setTimeout(() => {
          document.getElementById('centralArea').style.opacity = 0;
          setTimeout(() => {
            document.getElementById('player1PackedButton').classList.replace('disabled', 'available');
            document.getElementById('player1PackedButton').innerHTML = '<img src="./medias/images/font-awsome/star-regular.svg" />';
            document.getElementById('player2PackedButton').classList.replace('disabled', 'available');
            document.getElementById('player2PackedButton').innerHTML = '<img src="./medias/images/font-awsome/star-regular.svg" />';
  
            document.getElementById('centralArea').innerHTML = '';
            document.getElementById('centralArea').innerHTML = `
              <div class="keeper-symbol-container keeper-0"><img src="./medias/images/soe/keeper-0.png" /></div>
              <div class="keeper-symbol-container keeper-1"><img src="./medias/images/soe/keeper-1.png" /></div>
              <div class="keeper-symbol-container keeper-2"><img src="./medias/images/soe/keeper-2.png" /></div>
              <div class="keeper-symbol-container keeper-3"><img src="./medias/images/soe/keeper-3.png" /></div>
              <div class="keeper-symbol-container keeper-4"><img src="./medias/images/soe/keeper-4.png" /></div>
              <div class="keeper-symbol-container keeper-5"><img src="./medias/images/soe/keeper-5.png" /></div>
              <div class="keeper-symbol-container keeper-6"><img src="./medias/images/soe/keeper-6.png" /></div>
              <div class="keeper-symbol-container keeper-7"><img src="./medias/images/soe/keeper-7.png" /></div>
              <div class="keeper-symbol-container keeper-8"><img src="./medias/images/soe/keeper-8.png" /></div>
            `;


            document.getElementById('centralArea').style.opacity = 1;
  
            
          }, 500);
          
        }, 300);


      }
      break;
    /* ============================= JOUEUR 1 ============================= */

    case "player1NameButton":
      if (button.classList.contains('default-title')) {
        button.innerHTML = `<span>LAZR</span>`
        button.classList.replace('default-title', 'lazr-title');
        const player1Background = document.getElementById('player1Background');
        player1Background.classList.replace('default-background', 'lazr-background');

      } else if (button.classList.contains('lazr-title')) {
        button.innerHTML = `<span>MANTA</span>`
        button.classList.replace('lazr-title', 'manta-title');
        const player1Background = document.getElementById('player1Background');
        player1Background.classList.replace('lazr-background', 'manta-background');

      } else if (button.classList.contains('manta-title')) {
        button.innerHTML = `<span>BRATI</span>`
        button.classList.replace('manta-title', 'brati-title');
        const player1Background = document.getElementById('player1Background');
        player1Background.classList.replace('manta-background', 'brati-background');

      } else if (button.classList.contains('brati-title')) {
        button.innerHTML = `<span>JOUEUR 1</span>`
        button.classList.replace('brati-title', 'default-title');
        const player1Background = document.getElementById('player1Background');
        player1Background.classList.replace('brati-background', 'default-background');

      }
      break;

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
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'servant');

        const player2ServantButton = document.getElementById('player2ServantButton');
        player2ServantButton.classList.replace('available', 'disabled');
        player2ServantButton.classList.replace('servant', 'disabled');
        player2ServantButton.innerHTML = `<img src="./medias/images/font-awsome/lock-solid.svg" />`;
      } else if (button.classList.contains('servant')) {
        button.classList.replace('servant', 'available');

        const player2ServantButton = document.getElementById('player2ServantButton');
        player2ServantButton.classList.replace('disabled', 'available');
        player2ServantButton.innerHTML = `<img src="./medias/images/soe/servant.svg" />`;
      }
      break;

    /* ============================= JOUEUR 2 ============================= */

    case "player2NameButton":
      if (button.classList.contains('default-title')) {
        button.innerHTML = `<span>BRATI</span>`
        button.classList.replace('default-title', 'brati-title');
        const player2Background = document.getElementById('player2Background');
        player2Background.classList.replace('default-background', 'brati-background');

      } else if (button.classList.contains('brati-title')) {
        button.innerHTML = `<span>MANTA</span>`
        button.classList.replace('brati-title', 'manta-title');
        const player2Background = document.getElementById('player2Background');
        player2Background.classList.replace('brati-background', 'manta-background');

      } else if (button.classList.contains('manta-title')) {
        button.innerHTML = `<span>LAZR</span>`
        button.classList.replace('manta-title', 'lazr-title');
        const player2Background = document.getElementById('player2Background');
        player2Background.classList.replace('manta-background', 'lazr-background');

      } else if (button.classList.contains('lazr-title')) {
        button.innerHTML = `<span>JOUEUR 2</span>`
        button.classList.replace('lazr-title', 'default-title');
        const player2Background = document.getElementById('player2Background');
        player2Background.classList.replace('lazr-background', 'default-background');

      }
      break;

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
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'servant');

        const player1ServantButton = document.getElementById('player1ServantButton');
        player1ServantButton.classList.replace('available', 'disabled');
        player1ServantButton.classList.replace('servant', 'disabled');
        player1ServantButton.innerHTML = `<img src="./medias/images/font-awsome/lock-solid.svg" />`;
      } else if (button.classList.contains('servant')) {
        button.classList.replace('servant', 'available');

        const player1ServantButton = document.getElementById('player1ServantButton');
        player1ServantButton.classList.replace('disabled', 'available');
        player1ServantButton.innerHTML = `<img src="./medias/images/soe/servant.svg" />`;
      }
      break;
  
    /* ============================= FOOTLIGHT ============================= */

    case "footlightDoor1Button":
      setFirstDoorButton(button, 'footlight');
      break;

    case "footlightDoor2Button":
      setSecondDoorButton(button, 'footlight');
      break;

    case "footlightDoor3Button":
      setThirdDoorButton(button);
      break;

    case "footlightBeastAreaButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      } else if (button.classList.contains('unlocked')) {
        button.classList.replace('unlocked', 'available');
      }
      break;

    case "footlightPortalButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      } else if (button.classList.contains('unlocked')) {
        button.classList.replace('unlocked', 'available');
      }
      break;
  
    /* ============================ WATERFRONT ============================ */
    case "waterfrontDoor1Button":
      setFirstDoorButton(button, 'waterfront');
      break;

    case "waterfrontDoor2Button":
      setSecondDoorButton(button, 'waterfront');
      break;

    case "waterfrontDoor3Button":
      setThirdDoorButton(button);
      break;

    case "waterfrontBeastAreaButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      } else if (button.classList.contains('unlocked')) {
        button.classList.replace('unlocked', 'available');
      }
      break;

    case "waterfrontPortalButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      } else if (button.classList.contains('unlocked')) {
        button.classList.replace('unlocked', 'available');
      }
      break;

    /* =============================== CANAL =============================== */
    case "canalDoor1Button":
      setFirstDoorButton(button, 'canal');
      break;

    case "canalDoor2Button":
      setSecondDoorButton(button, 'canal');
      break;

    case "canalDoor3Button":
      setThirdDoorButton(button);
      break;

    case "canalBeastAreaButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      } else if (button.classList.contains('unlocked')) {
        button.classList.replace('unlocked', 'available');
      }
      break;

    case "canalPortalButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      } else if (button.classList.contains('unlocked')) {
        button.classList.replace('unlocked', 'available');
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
  <div id="centralArea" class="central-area">
    <div id="neroRitualButton" class="ritual-button nero-ritual-button" onclick="onButtonClick('neroRitualButton')"><div id="neroRitualSymbolContainer" class="ritual-symbol-container ritual-available"><img src="./medias/images/soe/rituel1.svg"/></div></div>
    <div id="jessicaRitualButton" class="ritual-button jessica-ritual-button" onclick="onButtonClick('jessicaRitualButton')"><div id="jessicaRitualSymbolContainer" class="ritual-symbol-container ritual-disabled"><img src="./medias/images/soe/rituel2.svg"/></div></div>
    <div id="floydRitualButton" class="ritual-button floyd-ritual-button" onclick="onButtonClick('floydRitualButton')"><div id="floydRitualSymbolContainer" class="ritual-symbol-container ritual-disabled"><img src="./medias/images/soe/rituel3.svg"/></div></div>
    <div id="jackRitualButton" class="ritual-button jack-ritual-button" onclick="onButtonClick('jackRitualButton')"><div id="jackRitualSymbolContainer" class="ritual-symbol-container ritual-disabled"><img src="./medias/images/soe/rituel4.svg"/></div></div>
    <div id="riftRitualButton" class="ritual-button rift-ritual-button" onclick="onButtonClick('riftRitualButton')"><div id="riftRitualSymbolContainer" class="ritual-symbol-container ritual-available"><img src="./medias/images/soe/rituel5.svg"/></div></div>
  </div>
  <div id="player1Background" class="player-area player-1-area default-background">
    <div id="player1NameButton" class="area-title default-title" onclick="onButtonClick('player1NameButton')"><span>JOUEUR 1</span></div>
    <div class="area-content">
      <div id="player1PackedButton" class="round-button disabled" onclick="onButtonClick('player1PackedButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="player1SwordButton" class="round-button available" onclick="onButtonClick('player1SwordButton')"><img src="./medias/images/soe/sword.svg" /></div>
      <div id="player1RayGunButton" class="round-button available" onclick="onButtonClick('player1RayGunButton')"><img src="./medias/images/soe/ray-gun.svg" /></div>
      <div id="player1ArniesButton" class="round-button available" onclick="onButtonClick('player1ArniesButton')"><img src="./medias/images/soe/arnie.svg" /></div>
      <div id="player1ServantButton" class="round-button available" onclick="onButtonClick('player1ServantButton')"><img src="./medias/images/soe/servant.svg" /></div>
    </div>
  </div>
  <div id="player2Background" class="player-area player-2-area default-background">
    <div id="player2NameButton" class="area-title default-title" onclick="onButtonClick('player2NameButton')"><span>JOUEUR 2</span></div>
    <div class="area-content">
      <div id="player2PackedButton" class="round-button disabled" onclick="onButtonClick('player2PackedButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="player2SwordButton" class="round-button available" onclick="onButtonClick('player2SwordButton')"><img src="./medias/images/soe/sword.svg" /></div>
      <div id="player2RayGunButton" class="round-button available" onclick="onButtonClick('player2RayGunButton')"><img src="./medias/images/soe/ray-gun.svg" /></div>
      <div id="player2ArniesButton" class="round-button available" onclick="onButtonClick('player2ArniesButton')"><img src="./medias/images/soe/arnie.svg" /></div>
      <div id="player2ServantButton" class="round-button available" onclick="onButtonClick('player2ServantButton')"><img src="./medias/images/soe/servant.svg" /></div>
    </div>
  </div>
  <div class="district-area footlight-area" style="background-image: url('./medias/images/soe/footlight.webp');">
    <div class="area-title default-title"><span>FOOTLIGHT</span></div>
    <div class="area-content">
      <div id="footlightLine1" class="line line-1"></div>
      <div id="footlightLine2" class="line line-2"></div>
      <div id="footlightDoor1Button" class="round-button available" onclick="onButtonClick('footlightDoor1Button')"><img src="./medias/images/font-awsome/door-closed-solid.svg" /></div>
      <div id="footlightDoor2Button" class="round-button disabled" onclick="onButtonClick('footlightDoor2Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="footlightDoor3Button" class="round-button disabled" onclick="onButtonClick('footlightDoor3Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="footlightBeastAreaButton" class="round-button disabled" onclick="onButtonClick('footlightBeastAreaButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="footlightPortalButton" class="round-button disabled" onclick="onButtonClick('footlightPortalButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
  <div class="district-area waterfront-area" style="background-image: url('./medias/images/soe/waterfront.webp');">
    <div class="area-title default-title"><span>WATERFRONT</span></div>
    <div class="area-content">
      <div id="waterfrontLine1" class="line line-1"></div>
      <div id="waterfrontLine2" class="line line-2"></div>
      <div id="waterfrontDoor1Button" class="round-button available" onclick="onButtonClick('waterfrontDoor1Button')"><img src="./medias/images/font-awsome/door-closed-solid.svg" /></div>
      <div id="waterfrontDoor2Button" class="round-button disabled" onclick="onButtonClick('waterfrontDoor2Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="waterfrontDoor3Button" class="round-button disabled" onclick="onButtonClick('waterfrontDoor3Button')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="waterfrontBeastAreaButton" class="round-button disabled" onclick="onButtonClick('waterfrontBeastAreaButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="waterfrontPortalButton" class="round-button disabled" onclick="onButtonClick('waterfrontPortalButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
  <div class="district-area canal-area" style="background-image: url('https://callofdutymaps.com/wp-content/uploads/shadowsofevil20-1024x576.jpg');">
    <div class="area-title default-title"><span>CANAL</span></div>
    <div class="area-content">
      <div id="canalLine1" class="line line-1"></div>
      <div id="canalLine2" class="line line-2"></div>
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

