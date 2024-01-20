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

const setPercButton = (button) => {
  if (button.classList.contains('jugger-nog-perc')) {
    button.classList.replace('jugger-nog-perc', 'double-tap-perc');
    button.innerHTML = `<img src="./medias/images/soe/double-tap.png" />`;
  } else if (button.classList.contains('double-tap-perc')) {
    button.classList.replace('double-tap-perc', 'speed-cola-perc');
    button.innerHTML = `<img src="./medias/images/soe/speed-cola.png" />`;
  } else if (button.classList.contains('speed-cola-perc')) {
    button.classList.replace('speed-cola-perc', 'jugger-nog-perc');
    button.innerHTML = `<img src="./medias/images/soe/jugger-nog.png" />`;
  }
}

const setKeeperButton = (button) => {
  if (!button.classList.contains('found')) {
    button.classList.add('found');
    tramSymbols += 1;

  } else {
    button.classList.remove('found');
    tramSymbols -= 1;
  }
  if (tramSymbols == 3) {
    document.getElementById('eggStandButton').classList.remove('disabled');
  } else {
    document.getElementById('eggStandButton').classList.add('disabled');
  }
}

const setEggButtons = (button, playerNumber) => {
  if (button.classList.contains('empty')) {
    switch (playerNumber) {
      case 1:
        if (player1PendingEggParts == 0) {
          button.classList.replace('empty', 'pending');
          player1PendingEggParts += 1;
        }
        break;
      case 2:
        if (player2PendingEggParts == 0) {
          button.classList.replace('empty', 'pending');
          player2PendingEggParts += 1;
        }
          break;
      default:
        break;
    }
  } else if (button.classList.contains('pending')) {
    button.classList.replace('pending', 'full');
    switch (playerNumber) {
      case 1:
        player1PendingEggParts -= 1;
        player1CompletedEggParts += 1;
        if (player1CompletedEggParts == 4) {
          setTimeout(() => {
            document.getElementById('player1EggContainer').style.opacity = 0;
            setTimeout(() => {
              document.getElementById('player1SwordButton').classList.replace('disabled', 'available');
              document.getElementById('player1SwordButton').innerHTML = '<img src="./medias/images/soe/sword.svg" />';
              if (player2CompletedEggParts == 4) {
                setUpBlankCentralPart();
              }
            }, 500);
          }, 300);
        }
        break;
      case 2:
          player2PendingEggParts -= 1;
          player2CompletedEggParts += 1;
          if (player2CompletedEggParts == 4) {
            setTimeout(() => {
              document.getElementById('player2EggContainer').style.opacity = 0;
              setTimeout(() => {
                document.getElementById('player2SwordButton').classList.replace('disabled', 'available');
                document.getElementById('player2SwordButton').innerHTML = '<img src="./medias/images/soe/sword.svg" />';
                if (player1CompletedEggParts == 4) {
                  setUpBlankCentralPart();
                }
              }, 500);
            }, 300);
          }
          break;
      default:
        break;
    }
  }

}

const setUpBlankCentralPart = () => {
  document.getElementById('centralArea').innerHTML = '';
  document.getElementById('centralArea').style.opacity = 0;
  setTimeout(() => {
    document.getElementById('centralArea').innerHTML = `<div class="blank-central-area"><div class="splatter-frame"></div></div>`;
    document.getElementById('centralArea').style.opacity = 1;
  }, 300);
}

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

const onButtonClick = (buttonId) => {
  //console.log(buttonId);
  const button = document.getElementById(buttonId);
  switch (buttonId) {

    /* */
    case "nextRoundButton":
      currentRound += 1;
      document.getElementById('currentRound').innerHTML = `${currentRound}`;

      if (currentRound == 12) {
        document.getElementById('player1ServantButton').classList.replace('disabled', 'available');
        document.getElementById('player1ServantButton').innerHTML = `<img src="./medias/images/soe/servant.svg" />`;
        document.getElementById('player2ServantButton').classList.replace('disabled', 'available');
        document.getElementById('player2ServantButton').innerHTML = `<img src="./medias/images/soe/servant.svg" />`;
      }
      break;

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
              <div id="keeper0" class="keeper-symbol-container keeper-0" onclick="onButtonClick('keeper0')"><img src="./medias/images/soe/keeper-0.png" /></div>
              <div id="keeper1" class="keeper-symbol-container keeper-1" onclick="onButtonClick('keeper1')"><img src="./medias/images/soe/keeper-1.png" /></div>
              <div id="keeper2" class="keeper-symbol-container keeper-2" onclick="onButtonClick('keeper2')"><img src="./medias/images/soe/keeper-2.png" /></div>
              <div id="keeper3" class="keeper-symbol-container keeper-3" onclick="onButtonClick('keeper3')"><img src="./medias/images/soe/keeper-3.png" /></div>
              <div id="keeper4" class="keeper-symbol-container keeper-4" onclick="onButtonClick('keeper4')"><img src="./medias/images/soe/keeper-4.png" /></div>
              <div id="keeper5" class="keeper-symbol-container keeper-5" onclick="onButtonClick('keeper5')"><img src="./medias/images/soe/keeper-5.png" /></div>
              <div id="keeper6" class="keeper-symbol-container keeper-6" onclick="onButtonClick('keeper6')"><img src="./medias/images/soe/keeper-6.png" /></div>
              <div id="keeper7" class="keeper-symbol-container keeper-7" onclick="onButtonClick('keeper7')"><img src="./medias/images/soe/keeper-7.png" /></div>
              <div id="keeper8" class="keeper-symbol-container keeper-8" onclick="onButtonClick('keeper8')"><img src="./medias/images/soe/keeper-8.png" /></div>
              <div id="eggStandButton" class="egg-stand-button disabled" onclick="onButtonClick('eggStandButton')"><img src="./medias/images/soe/egg-stand.png" /></div>
            `;

            document.getElementById('centralArea').style.opacity = 1;
          }, 500);
          
        }, 300);

      }
      break;

    /* */
    case "keeper0":
      setKeeperButton(button);
      break;
    case "keeper1":
      setKeeperButton(button);
      break;
    case "keeper2":
      setKeeperButton(button);
      break;
    case "keeper3":
      setKeeperButton(button);
      break;
    case "keeper4":
      setKeeperButton(button);
      break;
    case "keeper5":
      setKeeperButton(button);
      break;
    case "keeper6":
      setKeeperButton(button);
      break;
    case "keeper7":
      setKeeperButton(button);
      break;
    case "keeper8":
      setKeeperButton(button);
      break;

    case "eggStandButton":
      if (!button.classList.contains('disabled')) {
        setTimeout(() => {
          document.getElementById('centralArea').style.opacity = 0;
          setTimeout(() => {
            /* 
            document.getElementById('player2SwordButton').classList.replace('disabled', 'available');
            document.getElementById('player2SwordButton').innerHTML = '<img src="./medias/images/soe/sword.svg" />'; */
  
            document.getElementById('centralArea').innerHTML = '';
            document.getElementById('centralArea').innerHTML = `
              <div id="player1EggContainer" class="egg-container egg-player-1">
                <div id="eggPlayer1Rift" class="egg-part empty" onclick="onButtonClick('eggPlayer1Rift')"><span>RIFT</span></div>
                <div id="eggPlayer1Footlight" class="egg-part empty" onclick="onButtonClick('eggPlayer1Footlight')"><span>FOOTLIGHT</span></div>
                <div id="eggPlayer1Waterfront" class="egg-part empty" onclick="onButtonClick('eggPlayer1Waterfront')"><span>WATERFRONT</span></div>
                <div id="eggPlayer1Canal" class="egg-part empty" onclick="onButtonClick('eggPlayer1Canal')"><span>CANAL</span></div>
              </div>
              <div id="player2EggContainer" class="egg-container egg-player-2">
                <div id="eggPlayer2Rift" class="egg-part empty" onclick="onButtonClick('eggPlayer2Rift')"><span>RIFT</span></div>
                <div id="eggPlayer2Footlight" class="egg-part empty" onclick="onButtonClick('eggPlayer2Footlight')"><span>FOOTLIGHT</span></div>
                <div id="eggPlayer2Waterfront" class="egg-part empty" onclick="onButtonClick('eggPlayer2Waterfront')"><span>WATERFRONT</span></div>
                <div id="eggPlayer2Canal" class="egg-part empty" onclick="onButtonClick('eggPlayer2Canal')"><span>CANAL</span></div>
              </div>
            `;

            document.getElementById('centralArea').style.opacity = 1;
          }, 500);
          
        }, 300);

      }
      break;

    case "eggPlayer1Rift":
      setEggButtons(button, 1);
      break;
    case "eggPlayer1Footlight":
      setEggButtons(button, 1);
      break;
    case "eggPlayer1Waterfront":
      setEggButtons(button, 1);
      break;
    case "eggPlayer1Canal":
      setEggButtons(button, 1);
      break;

    case "eggPlayer2Rift":
      setEggButtons(button, 2);
      break;
    case "eggPlayer2Footlight":
      setEggButtons(button, 2);
      break;
    case "eggPlayer2Waterfront":
      setEggButtons(button, 2);
      break;
    case "eggPlayer2Canal":
      setEggButtons(button, 2);
      break;
    /* ============================= JOUEUR 1 ============================= */

    case "player1NameButton":
      if (button.classList.contains('player-1-title')) {
        button.innerHTML = `<span>LAZR</span>`
        button.classList.replace('player-1-title', 'lazr-title');
        const player1Background = document.getElementById('player1Background');
        player1Background.classList.replace('player-1-background', 'lazr-background');

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
        button.classList.replace('brati-title', 'player-1-title');
        const player1Background = document.getElementById('player1Background');
        player1Background.classList.replace('brati-background', 'player-1-background');

      }
      break;

    case "player1PackedButton" :
      setTriStateButton(button);
      break;

    case "player1SwordButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      } else if (button.classList.contains('unlocked')) {
        button.classList.replace('unlocked', 'packed');
        button.innerHTML = `<img src="./medias/images/soe/sword-upgraded.png" />`;
      } else if (button.classList.contains('packed')) {
        button.classList.replace('packed', 'available');
        button.innerHTML = `<img src="./medias/images/soe/sword.svg" />`;
      }
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
      if (button.classList.contains('player-2-title')) {
        button.innerHTML = `<span>BRATI</span>`
        button.classList.replace('player-2-title', 'brati-title');
        const player2Background = document.getElementById('player2Background');
        player2Background.classList.replace('player-2-background', 'brati-background');

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
        button.classList.replace('lazr-title', 'player-2-title');
        const player2Background = document.getElementById('player2Background');
        player2Background.classList.replace('lazr-background', 'player-2-background');

      }
      break;

    case "player2PackedButton":
      setTriStateButton(button);
      break;

    case "player2SwordButton":
      if (button.classList.contains('available')) {
        button.classList.replace('available', 'unlocked');
      } else if (button.classList.contains('unlocked')) {
        button.classList.replace('unlocked', 'packed');
        button.innerHTML = `<img src="./medias/images/soe/sword-upgraded.png" />`;
      } else if (button.classList.contains('packed')) {
        button.classList.replace('packed', 'available');
        button.innerHTML = `<img src="./medias/images/soe/sword.svg" />`;
      }
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

    case "footlightPercContainer":
      setPercButton(button);
      break;

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

    case "waterfrontPercContainer":
      setPercButton(button);
      break;
    
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

    case "canalPercContainer":
      setPercButton(button);
      break;

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

let currentRound = 1;
let completedRituals = 0;
let tramSymbols = 0;
let player1PendingEggParts = 0;
let player1CompletedEggParts = 0;
let player2PendingEggParts = 0;
let player2CompletedEggParts = 0;

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

/* let splatters = false;
const showSplatters = () => {
  const beforeRituals = document.getElementsByClassName('ritual-button');
  for (var i = 0; i < beforeRituals.length; i++) {
    const styles = window.getComputedStyle(beforeRituals[i],':before');
    styles.display = 'flex';
  }
  console.log('coucou');
}
window.showSplatters = showSplatters; */

const main = document.getElementById('main');
main.innerHTML = `
  <div class="rounds-area actual-round-area">MANCHE <span id="currentRound">1</span></div>
  <div class="rounds-area next-round-area"><div id="nextRoundButton" class="next-round-button" onclick="onButtonClick('nextRoundButton')">MANCHE SUIVANTE</div></div>
  <div id="centralArea" class="central-area">
    <div id="neroRitualButton" class="ritual-button nero-ritual-button" onclick="onButtonClick('neroRitualButton')"><div id="neroRitualSymbolContainer" class="ritual-symbol-container ritual-available"><img src="./medias/images/soe/rituel1.svg"/></div></div>
    <div id="jessicaRitualButton" class="ritual-button jessica-ritual-button" onclick="onButtonClick('jessicaRitualButton')"><div id="jessicaRitualSymbolContainer" class="ritual-symbol-container ritual-disabled"><img src="./medias/images/soe/rituel2.svg"/></div></div>
    <div id="floydRitualButton" class="ritual-button floyd-ritual-button" onclick="onButtonClick('floydRitualButton')"><div id="floydRitualSymbolContainer" class="ritual-symbol-container ritual-disabled"><img src="./medias/images/soe/rituel3.svg"/></div></div>
    <div id="jackRitualButton" class="ritual-button jack-ritual-button" onclick="onButtonClick('jackRitualButton')"><div id="jackRitualSymbolContainer" class="ritual-symbol-container ritual-disabled"><img src="./medias/images/soe/rituel4.svg"/></div></div>
    <div id="riftRitualButton" class="ritual-button rift-ritual-button" onclick="onButtonClick('riftRitualButton')"><div id="riftRitualSymbolContainer" class="ritual-symbol-container ritual-available"><img src="./medias/images/soe/rituel5.svg"/></div></div>
  </div>
  <div id="player1Background" class="player-area player-1-area player-1-background">
    <div id="player1NameButton" class="area-title player-1-title" onclick="onButtonClick('player1NameButton')"><span>JOUEUR 1</span></div>
    <div class="area-content">
      <div id="player1PackedButton" class="round-button disabled" onclick="onButtonClick('player1PackedButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="player1SwordButton" class="round-button disabled" onclick="onButtonClick('player1SwordButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="player1RayGunButton" class="round-button available" onclick="onButtonClick('player1RayGunButton')"><img src="./medias/images/soe/ray-gun.svg" /></div>
      <div id="player1ArniesButton" class="round-button available" onclick="onButtonClick('player1ArniesButton')"><img src="./medias/images/soe/arnie.svg" /></div>
      <div id="player1ServantButton" class="round-button disabled" onclick="onButtonClick('player1ServantButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
  <div id="player2Background" class="player-area player-2-area player-2-background">
    <div id="player2NameButton" class="area-title player-2-title" onclick="onButtonClick('player2NameButton')"><span>JOUEUR 2</span></div>
    <div class="area-content">
      <div id="player2PackedButton" class="round-button disabled" onclick="onButtonClick('player2PackedButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="player2SwordButton" class="round-button disabled" onclick="onButtonClick('player2SwordButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
      <div id="player2RayGunButton" class="round-button available" onclick="onButtonClick('player2RayGunButton')"><img src="./medias/images/soe/ray-gun.svg" /></div>
      <div id="player2ArniesButton" class="round-button available" onclick="onButtonClick('player2ArniesButton')"><img src="./medias/images/soe/arnie.svg" /></div>
      <div id="player2ServantButton" class="round-button disabled" onclick="onButtonClick('player2ServantButton')"><img src="./medias/images/font-awsome/lock-solid.svg" /></div>
    </div>
  </div>
  <div class="district-area footlight-area" style="background-image: url('./medias/images/soe/footlight.webp');">
    <div class="area-title default-title"><span>FOOTLIGHT</span><div id="footlightPercContainer" class="perc-container jugger-nog-perc" onclick="onButtonClick('footlightPercContainer')"><img src="./medias/images/soe/jugger-nog.png" /></div></div>
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
    <div class="area-title default-title"><span>WATERFRONT</span><div id="waterfrontPercContainer" class="perc-container double-tap-perc" onclick="onButtonClick('waterfrontPercContainer')"><img src="./medias/images/soe/double-tap.png" /></div></div>
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
    <div class="area-title default-title"><span>CANAL</span><div id="canalPercContainer" class="perc-container speed-cola-perc" onclick="onButtonClick('canalPercContainer')"><img src="./medias/images/soe/speed-cola.png" /></div></div>
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

