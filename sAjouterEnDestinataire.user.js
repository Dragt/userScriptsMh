// ==UserScript==
// @name sAjouterEnDestinataire
// @namespace Violentmonkey Scripts
// @include */mountyhall/Messagerie/MH_Messagerie.php?cat=3*
// @run-at document-end
// @grant none
// @version 1.0
// ==/UserScript==

// par défaut run-at document-end... mais être sûr que ça se lance après DOMContentLoaded

// pourrait être fait de manière beaucoup plus légère en inscrivnt simplement le numéro dans l'input
// ici, utilise les outils à disposition de manière classique et possibilité de se retirer

"use strict";

if (window.jQuery) { 
    const numero = document.querySelector("a[href*='javascript:EnterPJView(']").href.split("(")[1].split(',')[0];
	  if (! ($('#dest_tags').tagExist(numero))) {
		  $('#dest_tags').addTag(numero, numero);
    }
 }  



//const FENETRE_MESSAGERIE = '/mountyhall/Messagerie/MH_Messagerie.php?cat=3';
// if (window.location.pathname === FENETRE_MESSAGERIE) { }
  
