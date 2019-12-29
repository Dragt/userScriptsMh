// ==UserScript==
// @name styleClairEvenements
// @namespace Violentmonkey Scripts
// @include *mountyhall/View/PJView_Events*
// @grant none
// @version 1.0
// ==/UserScript==
//


if (window.location.pathname === "/mountyhall/View/PJView_Events.php") {
  const cssBase = document.querySelector('link[href="/mountyhall/MH_PageUtils/MH_Style_ProfilSimple.css"]');
  if (cssBase) {
    const cssBlason = document.querySelector('link[href*="//blason.mountyhall.com//Css_PJ"]');
    if (cssBlason) {
      cssBlason.disabled = true;
    }
    else {
      Array.from(document.querySelectorAll("style"))
        .filter(x => (trouves = x.innerText.match(/.mh_tdborder|.mh_tdtitre|.mh_tdpage|.mh_texte/g)) ? trouves.length === 4 : false)
        .forEach(x => {x.innerText = ""});
    }
    cssBase.href = "/mountyhall/MH_Packs/packMH_parchemin/css/MH_Style_Play.css";
  }
  else if (document.querySelector('link[href="/mountyhall/MH_PageUtils/MH_Style_ProfilAvance.css"]')) {
    document.querySelector('link[title*="Style personna"]').href = "/mountyhall/MH_PageUtils/MH_Style_ProfilAvance.css";
  }
}




/* version simple
if (window.location.pathname === "/mountyhall/View/PJView_Events.php") {
  window.addEventListener("load", function () {setActiveStyleSheet("Style de base");});
}
*/
