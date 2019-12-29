// ==UserScript==
// @name styleClairEvenements
// @namespace Violentmonkey Scripts
// @include *mountyhall/View/PJView_Events*
// @grant none
// @version 1.4
// ==/UserScript==
//


 const PATH_EVENEMENTS = "/mountyhall/View/PJView_Events.php";


if (window.location.pathname === PATH_EVENEMENTS) {
  
  const PATH_CSS_SIMPLE = "/mountyhall/MH_PageUtils/MH_Style_ProfilSimple.css";
  const PATH_CSS_AVANCE = "/mountyhall/MH_PageUtils/MH_Style_ProfilAvance.css";
  const URL_CSS_BLASON_COMMUN = "//blason.mountyhall.com//Css_PJ";
  const PATH_CSS_PARCHEMIN = "/mountyhall/MH_Packs/packMH_parchemin/css/MH_Style_Play.css";
  const TEXTES_COULEURS_PERSO = [".mh_tdborder", ".mh_tdtitre", ".mh_tdpage", ".mh_texte"];

  
  const cssBase = document.querySelector(`link[href="${PATH_CSS_SIMPLE}"]`);
  if (cssBase) {
    const cssBlason = document.querySelector(`link[href*="${URL_CSS_BLASON_COMMUN}"]`);
    if (cssBlason) {
      cssBlason.disabled = true;
    }
    else {
      Array.from(document.querySelectorAll("style"))
        .filter(x => { 
          let textesTrouves = x.innerText.match(new RegExp(TEXTES_COULEURS_PERSO.join('|'), 'g'));
          return (textesTrouves ? textesTrouves.length === TEXTES_COULEURS_PERSO.length : false);
        })
        .forEach(x => {x.innerText = ""});
    }
    cssBase.href = PATH_CSS_PARCHEMIN;
  }
  else if (document.querySelector(`link[href="${PATH_CSS_AVANCE}"]`)) {
    const cssPersonnalise = document.querySelector('link[title*="Style personna"]');
    if (cssPersonnalise) cssPersonnalise.href = PATH_CSS_AVANCE;
  }
}




/* version simple
if (window.location.pathname === "/mountyhall/View/PJView_Events.php") {
  window.addEventListener("load", function () {setActiveStyleSheet("Style de base");});
}
*/
