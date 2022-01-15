// On va chercher chaque Id des inputs du DOM qui nous intéressent
let commande = document.getElementById("commande");
let nom = document.getElementById('lastname');
let prenom = document.getElementById('firstname');
let adresse = document.getElementById('address');
let codePostal = document.getElementById('code');
let ville = document.getElementById('city');
let livraison = document.getElementById('date');
let pays = document.getElementById('country');
let number = document.getElementById('number');
let carteV = document.getElementById('Visa');
let carteM = document.getElementById('Mastercard');
let produit = document.getElementById('product');
let produitHorsTaxe = document.getElementById('prixHt');
let prixTPS = document.getElementById('TPS');
let prixTVQ = document.getElementById('TVQ');
let prixTTC = document.getElementById('prixTTC');
let inputs = document.querySelectorAll('inputs');

// On va écouter nos inputs à chaque événement au clavier et perte du focus
nom.addEventListener('keyup', validerNom);
nom.addEventListener('blur', validerNom);
prenom.addEventListener('keyup', validerPrenom);
prenom.addEventListener('blur', validerPrenom);
adresse.addEventListener('keyup', validerAdresse);
adresse.addEventListener('blur', validerAdresse);
codePostal.addEventListener('keyup', validerCodePostal);
codePostal.addEventListener('blur', validerCodePostal);
ville.addEventListener('keyup', validerVille);
ville.addEventListener('blur', validerVille);
livraison.addEventListener('keyup', validerLivraison);
livraison.addEventListener('blur', validerLivraison);
pays.addEventListener('keyup', validerPays);
pays.addEventListener('blur', validerPays);
produit.addEventListener('keyup', validerProduit);
produit.addEventListener('blur', validerProduit);
carteV.addEventListener('keyup', validerCarte);
carteV.addEventListener('blur', validerCarte);
carteM.addEventListener('keyup', validerCarte);
carteM.addEventListener('blur', validerCarte);
number.addEventListener('keyup', validerCarte);
number.addEventListener('blur', validerCarte);

// On va chercher chaque Id des span "erreurs" du DOM qui nous intéressent
let errorNom = document.getElementById('errornom');
let errorPrenom = document.getElementById('errorprenom');
let errorAdresse = document.getElementById('erroradresse');
let errorCodePostal = document.getElementById('errorcodepostal');
let errorVille = document.getElementById('errorville');
let errorLivraison = document.getElementById('errordate');
let errorProduit = document.getElementById('errorproduit');
let errorCarte = document.getElementById('errorcarte');
let errorPays = document.getElementById('errorpays');
let errornumero = document.getElementById('errornumero');

// Définition de toutes nos régex pour nos imputs
let modeleCodePostal = /^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}$/;
let modeleProduit = /^[1-9][0-9]*$/;
let modeleVisa = /^[4][9][9][0][0-9]{12}$/;
let modeleMastercard = /^[5][2][5][8][0-9]{12}$/;

// écouteur d'événement sur nos deux checkbox
carteV.addEventListener("click", toggleCarte);
carteM.addEventListener("click", toggleCarte);
// écouteur d'événement sur notre formulaire de commande
commande.addEventListener("submit", valider);

let error = false;

// Vérifie si la checkbox carte est cochée
toggleCarte();

function valider(e) {
    
    error = false;
    viderErreur(); // Fait disparaître toutes les erreurs
    validerNom();
    validerPrenom();
    validerAdresse();
    validerCodePostal();
    validerVille();
    validerLivraison();
    validerPays();
    validerCarte();
    validerProduit();
    e.preventDefault();
    document.getElementById("message").textContent = "Merci pour votre Commande";
    // Bloque l'envoi du formulaire si error 
    if (error){
        e.preventDefault();
        document.getElementById("message").textContent = " ";
    }         
}

function validerNom() {
    errorNom.innerHTML = " ";
    if (nom.value.trim() === ""){
        error = true;
        errorNom.innerHTML = 'Ce champs est requis'; // message pour informer les utilisateurs    
    } 
}

function validerPrenom() {
    errorPrenom.innerHTML = " ";
    if (prenom.value.trim() === ""){
        error = true;
        errorPrenom.innerHTML = 'Ce champs est requis'; // message pour informer les utilisateurs
    } 
}

function validerAdresse(){
    errorAdresse.innerHTML = " ";
    if (adresse.value.trim() === ""){
        error = true;
        errorAdresse.innerHTML = 'Ce champs est requis'; // message pour informer les utilisateurs
    }
}

function validerCodePostal(){
    errorCodePostal.innerHTML = " ";
    if (codePostal.value.trim() === ""){
        error = true;
        errorCodePostal.innerHTML = 'Ce champs est requis'; // message pour informer les utilisateurs
    } else if(modeleCodePostal.test(codePostal.value) === false) {
        error = true;
        errorCodePostal.innerHTML = 'Le format n\'est pas valide'; // message pour informer les utilisateurs
    }
}

function validerVille(){
    errorVille.innerHTML = " ";
    if (ville.value.trim() === ""){
        error = true;
        errorVille.innerHTML = 'Ce champs est requis'; // message pour informer les utilisateurs
    } 
}

function validerPays(){
    errorPays.innerHTML = " ";
    if (pays.value === "0"){
        error = true;
        errorPays.innerHTML = "Veuillez sélectionner un Pays"; 
    } 
}

function validerCarte(){
    errorCarte.innerHTML = " ";
    if (carteV.checked) {
        errornumero.innerHTML = " ";
        if (number.value.trim() === " " || (modeleVisa.test(number.value) === false)) {
            error = true;
            errornumero.innerHTML = 'Cette carte n\'est pas une Visa'; // message pour informer les utilisateurs 
        }
    } else if (carteM.checked) {
        errornumero.innerHTML = " ";
        if (number.value.trim() === " " || (modeleMastercard.test(number.value) === false)) {
            error = true;
            errornumero.innerHTML = 'Cette carte n\'est pas une Mastercard'; // message pour informer les utilisateurs 
        }
    }
}

function validerProduit(){
    errorProduit.innerHTML = " ";
    if (produit.value.trim() === ""){
        error = true;
        prixTPS.value = " ";
        prixTVQ.value = " ";
        prixTTC.value = " ";
        produitHorsTaxe.value = " ";
        errorProduit.innerHTML = 'Ce champs est requis'; // message pour informer les utilisateurs
        e.preventDefault();
    } else if(modeleProduit.test(produit.value) === false){
        error = true;
        errorProduit.innerHTML = 'Le nombre n\'est pas valide'; // message pour informer les utilisateurs
        e.preventDefault();
    } else if(modeleProduit.test(produit.value) === true){
        // Calcul du prix TTC de la commande pour un prix unitaire de 10$
        let prixTtc;
        let prixHt = 10;
        let TPS = 0.05;
        let TVQ = 0.0997;
        prixHt = (produit.value) * 10;
        let montantTPS = prixHt * TPS;
        let montantTVQ = prixHt * TVQ;
        prixTtc = prixHt + montantTPS + montantTVQ;
        //Affichage des différents montants liés au nombres de produits dans les imputs associés
        produitHorsTaxe.value = (prixHt + " $ ");
        prixTPS.value = (montantTPS.toFixed(2) + " $ ");
        prixTVQ.value = (montantTVQ.toFixed(2) + " $ ");
        prixTTC.value = (prixTtc.toFixed(2) + " $ ");
    }
}
// fontion reset qui sert à enlever les messages d'erreurs
function viderErreur() {
    errorNom.innerHTML = " ";
    errorPrenom.innerHTML = " ";
    errorAdresse.innerHTML = " ";
    errorCodePostal.innerHTML = " ";
    errorVille.innerHTML = " ";
    errorLivraison.innerHTML = " ";
    errorProduit.innerHTML = " ";
    errorCarte.innerHTML = " ";
    errorPays.innerHTML = " ";
    errornumero.innerHTML = " ";
}
function toggleCarte(e) {
    if (carteM.checked){
      number.disabled = false;
    } else if (carteV.checked){
      number.disabled = false;
    } else {
        number.disabled = true;
      errorCarte.innerHTML = "Veuillez sélectionner une Carte ";
      e.preventDefault();
    }
  }
  function validerLivraison() {
    errorLivraison.innerHTML = " ";
    let d = new Date();
    let date = new Date(d.getFullYear(),d.getMonth(),d.getDate());
    let mydate = new Date(livraison.value);
    if(date > mydate) {
        error = true;
        errorLivraison.innerHTML = 'Cette date n\'est pas valide'; // message pour informer les utilisateurs
    }else if (livraison.value.trim() === ""){
        error = true;
        errorLivraison.innerHTML = 'Choisir une date de livraison'; // message pour informer les utilisateurs
    }
}
