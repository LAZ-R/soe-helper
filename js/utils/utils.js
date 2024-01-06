import * as FILTER from './colors/filter.js';

/* ############################################################################
------------------------------------ MATHS ------------------------------------
############################################################################ */

export const getRandomIntegerBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* ############################################################################
----------------------------------- COLORS -----------------------------------
############################################################################ */

export const getFilterStringForHexValue = (hexValue) => {
  return FILTER.getFilterStringForHexValue(hexValue);
}


/* ############################################################################
------------------------------------- DOM -------------------------------------
############################################################################ */

export const setDocumentHeight = () => {
  document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', setDocumentHeight);

export const setHTMLTitle = (pageTitle) => {
  document.getElementById('title').innerHTML = pageTitle;
  document.getElementById('appleTitle').setAttribute('content', pageTitle);
}