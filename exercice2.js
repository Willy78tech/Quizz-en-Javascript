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
let bonnerep = document.getElementById('bonnerep');
let duréeChrono = 30;
let score = 0;

// mise en place d'un timer
let elem = document.getElementById('chrono');   
let timerId = setInterval(compteRebours, 1000);
function compteRebours() {
  if (duréeChrono === -1) {
    clearTimeout(timerId);
    elem.innerHTML = ' Temps écoulé';
  } else if (duréeChrono < 2){
  elem.innerHTML = ' Temps restant : ' + duréeChrono + ' seconde'; // On écrit seconde au singulier en dessous de 2 secondes
    duréeChrono--;
  }else {
  elem.innerHTML = ' Temps restant : ' + duréeChrono + ' secondes';
    duréeChrono--;
  }
}
// bouton pour lancer le quizz
startBouton.addEventListener('click', startJeu);

function startJeu() {
  startBouton.classList.add('hide') ;
  questionnaire.classList.remove('hide') ;
  capitale.innerHTML = "Capitale : " + questions[compteur].question;
  resultat.innerHTML = "Score : " + score;
  compteRebours(30) ;
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

function valider() {
  for(let i = 0; i < questions.length; i++) {
     if(reponse.value.toLowerCase() === questions[i].réponse){
       score += 1;
       resultat.innerHTML = "Score: " + score;// chaque bonne réponse est comptabilisée
     } else {
       bonnerep.innerHTML = " ";
     }
   }
}


// Tableau du questionnaire sur les capitales
let questions = [
    {
    question: "Canada",
    réponse: "ottawa"
},
{
    question: "Niger",
    réponse: "niamey"  
},
{
    question: "Suisse",
    réponse: "bern"
},
{
    question: "Japon",
    réponse: "tokyo"
},
{
    question: "Bolivie",
    réponse: "sucre"
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
}
function nextItem() {
  compteur++;
  if (compteur === 5) {
    compteur = 0;
  } 
  displayImg();
}
function displayImg() {
  capitale.innerHTML = "Capitale : " + questions[compteur].question;
  carImg.src = "Images/" + compteur + ".jpg";  
}


