// ==UserScript==
// @name remplirChampsDeVenteTaniere
// @namespace Violentmonkey Scripts
// @include *mountyhall/MH_Taniere*
// @grant none
// @version 1.0
// ==/UserScript==
//

const AUTOMATIQUE = 0;

// ------------------------------------- utilitaire ---------------------------------
class Do {

    static elem(tag, options={}) {
        const el = document.createElement(tag);
        
        if ('id' in options) el.setAttribute('id', options.id);
        if ('html' in options) el.innerHTML = options.html;
        if ('text' in options) el.appendChild(document.createTextNode(options.text));
        if ('attributes' in options) for (const attr of options.attributes) el.setAttribute(attr[0], attr[1]);
        if ('events' in options) {
            for (const event of options.events) {
                const bindParams = [];
                const bindObject = (('bindObject' in event) ? event.bindObject : el);
                bindParams.push(bindObject);
                if ('params' in event) bindParams.push(...event.params);
                el.addEventListener(event.name, event.callback.bind(...bindParams));
            } 
        }
        if ('htmlClasses' in options) for (const className of options.htmlClasses) el.classList.add(className);
        if ('style' in options) el.setAttribute('style', options.style);
        if ('children' in options) for (const enfant of options.children) el.appendChild(enfant);
        if ('parent' in options) options.parent.appendChild(el);
        
        return el;
    }
}

//------------------------------------------------------------------------------------


const ajouterRemplirChamps = () => {

    // version qui s'assure d'abord que le auto n'est pas coché, ainsi l'utilisateur doit tout de même cliquer à la main pour chaque objet
    const remplirChamps = (champNumero, champPrix, checkboxRemplacer) => {
        const remplacer = checkboxRemplacer.checked;
        document.getElementById('auto').checked = false;
      
        if (document.getElementById('auto').checked === false)  {  // on n'est jamais trop prudent. ;-)
          // TODO améliorer le sélecteur ?
          for (const tr of document.querySelectorAll('#stock tbody:last-of-type tr')) {
             const inputs = tr.querySelectorAll('input');
             if (remplacer || (! inputs[1].value && ! inputs[0].value) ) {
                 if (! (inputs[1].value === champNumero.value && inputs[0].value === champPrix.value)) {
                     inputs[1].value = champNumero.value;
                     inputs[0].value = champPrix.value;
		             inputs[0].dispatchEvent(new Event('change'));
                 }
             }      
         }
      } 
  }
  
  // version automatique qui attend un peu entre chaque envoi et qui en fait max 1000, pas mis à disposition, il faudrait l'avis de l'équipe. :)
    const remplirChampsAuto = (champNumero, champPrix, checkboxRemplacer) => {
        const remplacer = checkboxRemplacer.checked;
        // TODO améliorer le sélecteur ?
        trs = document.querySelectorAll('#stock tbody:last-of-type tr');
        (function x(i) {
            setTimeout(() => {
	            if  (i < trs.length && i < 1000)
	            {                    
                    const inputs = trs[i].querySelectorAll('input');
                    if (remplacer || (! inputs[1].value && ! inputs[0].value) ) {
                        if (! (inputs[1].value === champNumero.value && inputs[0].value === champPrix.value)) {
                            inputs[1].value = champNumero.value;
                            inputs[0].value = champPrix.value;
		                    inputs[0].dispatchEvent(new Event('change'));
                       }
                    }                  
		            x(i+1);
	            } 
            }, 250); // temps entre 2 changement
        })(0);    
   }   
    
  
  // cliquer sur mettre à jour ne revient pas en début de page
  for (const a of document.querySelectorAll("a[id*='stock-ajax-update']")) {
             a.href = "javascript:void(0)";
  }
  
  const divRemplirChamps = Do.elem('div', {id: 'divRemplirChamps'});
  
  Do.elem('p', {text: 'Modifier tous les objets de cette page : ', parent: divRemplirChamps});
  
   Do.elem('label', {text: 'Prix : ', attribute: [['for', 'champRemplirPrix']], style: 'margin-left: 2em', parent: divRemplirChamps});
  const champRemplirPrix = Do.elem('input', {id: 'champRemplirPrix', attributes: [['type', 'number']], style: 'width: 5em',  parent: divRemplirChamps});
  
  Do.elem('label', {text: 'Numéro de troll : ', attribute: [['for', 'champRemplirTroll']], style: 'margin-left: 2em', parent: divRemplirChamps});
  const champRemplirTroll = Do.elem('input', {id: 'champRemplirTroll', attributes: [['type', 'number']], style: 'width: 5em', parent: divRemplirChamps});
  
  Do.elem('label', {text: 'Remplacer les valeurs existantes ', attribute: [['for', 'checkboxRemplacerActuels']], style: 'margin-left: 2em', parent: divRemplirChamps});
  const checkboxRemplacerActuels = Do.elem('input', {id: 'checkboxRemplacerActuels', attributes: [['type', 'checkbox']], parent: divRemplirChamps});
  
  Do.elem('button', {id: 'boutonRemplir', 
                     text: 'Remplir les champs', 
                     events : [{name: 'click', 
                                callback: (AUTOMATIQUE ? remplirChampsAuto : remplirChamps), 
                                params: [champRemplirTroll, champRemplirPrix, checkboxRemplacerActuels]}], 
                     style: 'margin-left: 2em', 
                     parent: divRemplirChamps});    
  
  const parent = document.getElementById('mhPlay');
  parent.insertBefore(divRemplirChamps, document.getElementById('footer1'));
}


if (window.location.pathname == "/mountyhall/MH_Taniere/TanierePJ_o_Stock.php") {
   //document.addEventListener('DOMContentLoaded', ajouterRemplirChamps);
   ajouterRemplirChamps();
}





