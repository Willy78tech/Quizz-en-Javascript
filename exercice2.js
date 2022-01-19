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
let durée = 30;
let score = 0;

// bouton pour lancer le quizz
startBouton.addEventListener('click', startJeu);

function startJeu() {
  startBouton.classList.add('hide') ;
  document.getElementById('depart').classList.add('hide') ;
  questionnaire.classList.remove('hide') ;
  document.getElementById('perdu').classList.add('hide');
  capitale.innerHTML = "Capitale : " + questions[compteur].question;
  resultat.innerHTML = "Score : " + score;
  reponse.innerHTML = questions[compteur].repUser;
  if(durée === 0){
    
  }
}

// mise en place d'un timer

let duréeInterval = setInterval(compter, 1000);

function compter() {
  durée--;
  compte.innerHTML = compte.innerHTML = "Temps restant : " + durée;
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
    document.getElementById('bravo').innerHTML = 'Bravo ! Votre temps est de : ' + (durée - duréeInterval) + ' secondes';
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

function valider() {
  for(let i = 0 ; i < questions.length; i++) {
    if(reponse.value.toLowerCase() === questions[i].réponse){
      score += 1;
      resultat.innerHTML = "Score: " + score;// chaque bonne réponse est comptabilisée
      reponse.innerHTML = questions[i].repUser;
    }else{
      reponse.innerHTML = reponse.placeholder;
    }
  } 
}

// Tableau du questionnaire sur les capitales
let questions = [
    {
    question: "Canada",
    réponse: "ottawa",
    repUser : "ottawa"
},
{
    question: "Niger",
    réponse: "niamey",
    repUser : "niamey"  
},
{
    question: "Suisse",
    réponse: "bern",
    repUser : "bern"
},
{
    question: "Japon",
    réponse: "tokyo",
    repUser : "tokyo"
},
{
    question: "Bolivie",
    réponse: "sucre",
    repUser : "sucre"
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
  document.getElementById('reponse').focus() + compteur;
}


