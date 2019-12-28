// ==UserScript==
// @name styleClairEvenements
// @namespace Violentmonkey Scripts
// @include *mountyhall/View/PJView_Events*
// @grant none
// @version 1.0
// ==/UserScript==
//


if (window.location.pathname === "/mountyhall/View/PJView_Events.php") {
  window.addEventListener("load", function () {setActiveStyleSheet("Style de base");});
}
