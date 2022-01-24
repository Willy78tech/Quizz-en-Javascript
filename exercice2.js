"use strict";
// élément du DOM
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');
let carImg = document.getElementById('carImg');
let startBouton = document.getElementById('start');
let questionnaire = document.getElementById('quizz');
let capitale = document.getElementById('capitale');
let reponse = document.getElementById('reponse');
let resultat = document.getElementById('resultat');
let suivant = document.getElementById('suivant');
let compte = document.getElementById("compte");
let durée = 31;
let score = 0;
let duréeInterval;

// fonction bouton pour lancer le quizz
startBouton.addEventListener('click', startJeu);

function startJeu() {
  startBouton.classList.add('hide') ;
  document.getElementById('depart').classList.add('hide') ;
  questionnaire.classList.remove('hide') ;
  document.getElementById('perdu').classList.add('hide');
  capitale.innerHTML = "Capitale : " + questions[compteur].pays;
  resultat.innerHTML = "Score : " + score;
  duréeInterval = setInterval(compter, 1000);
}
// mise en place d'un timer

function compter() {
  durée--;
  compte.innerHTML = "Temps restant : " + durée;
  if (durée === 0) {
    clearInterval(duréeInterval);
    compte.innerHTML = compte.innerHTML = "Temps écoulé ";
    document.getElementById('perdu').style.backgroundColor = "red";
    document.getElementById('perdu').classList.remove('hide');
    resultat.classList.add('hide') ;
    suivant.classList.add('hide') ;
    reponse.classList.add('hide') ;
  } else if (score === 5){
    clearInterval(duréeInterval);
    document.getElementById('bravo').classList.remove('hide');
    document.getElementById('bravo').innerHTML = 'Bravo !' + '<br>' +'Votre temps est de : ' + (30 - durée) + ' secondes';
    resultat.classList.add('hide') ;
  }
}

// écouteur d'événement sur envoi de notre réponse au clic ou sur la touche entrée
suivant.addEventListener("click", valider);
suivant.addEventListener("click", nextItem);
reponse.addEventListener("keydown", function (e) {
  if (e.key === 'Enter') {  
      valider(e);
      nextItem(e);
  }
});

// fonction qui permet d'incrémenter le score
function valider() {
  if(reponse.value.toLowerCase() === questions[compteur].capitale){
    score += 1;
    resultat.innerHTML = "Score: " + score;// chaque bonne réponse est comptabilisée
    questions[compteur].bonnereponse = true;
  }
    reponse.value = "";
  } 

  // fonction qui permet de remplir le champs input de chaque diaporama
function correct (){
  if (questions[compteur].bonnereponse) {
    reponse.value = questions[compteur].capitale;
  } else {
    reponse.value = "";
  }
}  

// Tableau du questionnaire sur les capitales
let questions = [
    {
    pays: "Canada",
    capitale: "ottawa",
    bonnereponse: false
},
{
    pays: "Niger",
    capitale: "niamey",
    bonnereponse: false  
},
{
    pays: "Suisse",
    capitale: "bern",
    bonnereponse: false
},
{
    pays: "Japon",
    capitale: "tokyo",
    bonnereponse: false
},
{
    pays: "Bolivie",
    capitale: "sucre",
    bonnereponse: false
},
];

// carrousel de notre quizz avec bouton d'incrémentatation
prev.addEventListener('click', prevItem);
next.addEventListener('click', nextItem);

let compteur = 0;

function prevItem() {
  compteur--;
  if (compteur === -1) {
    compteur = 4;
  } 
  displayImg();
  correct ();
}
function nextItem() {
  compteur++;
  if (compteur === 5) {
    compteur = 0;
  } 
  displayImg();
  correct(); 
}
function displayImg() {
  capitale.innerHTML = "Capitale : " + questions[compteur].pays;
  carImg.src = "Images/" + compteur + ".jpg";
  document.getElementById('reponse').focus() + compteur; 
}