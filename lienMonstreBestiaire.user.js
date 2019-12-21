// ==UserScript==
// @name lienMonstreBestiaire
// @namespace Violentmonkey Scripts
// @include */mountyhall/View/MonsterView*
// @grant none
// @version 1.0
// ==/UserScript==
//

const URL_BESTIAIRE = "https://dragt.github.io/bestiaire/";

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



function allerBestiaire(nom, numero) {
	let lien = `${URL_BESTIAIRE}?monstreComplet=${encodeURIComponent(nom)}&numero=${encodeURIComponent(numero)}`;
	window.open(lien, '_blank');
  //window.open(lien);
}


if (window.location.pathname == "/mountyhall/View/MonsterView.php") {
  let barreTitre = document.querySelector("table.mh_tdborder tbody tr.mh_tdtitre td div.titre2");
  let nomEntier = barreTitre.innerText;

  let nomSplit = nomEntier.split('(').join(',').split(')').join(',').split(',');
  let nom = nomSplit[0].trim();
  let numero = nomSplit[1].trim();

   Do.elem('button', {id: 'boutonBestiaire', 
                       text: 'Voir bestiaire MZ', 
                       events : [{name: 'click', 
                                  callback: allerBestiaire,
                                  params: [nom, numero]}],
                       parent: barreTitre});    

}
