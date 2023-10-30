// Variables
let tempMessage = document.querySelector(".result"); // Sélectionne l'élément pour afficher la température
let nameMessage = document.querySelector(".name"); // Sélectionne l'élément pour afficher le nom de la ville
let weatherMessage = document.querySelector(".weather"); // Sélectionne l'élément pour afficher la météo
let btnGetTemp = document.getElementById("btnGetTemp"); // Sélectionne le bouton pour déclencher l'action
const options = {
  enableHighAccuracy: true, // Active une haute précision pour la géolocalisation
  timeout: 5000, // Limite le temps d'attente à 5 secondes
  maximumAge: 0, // Désactive le cache de géolocalisation
};

// Événement
btnGetTemp.addEventListener("click", getTemp); // Ajoute un écouteur pour le clic sur le bouton

// Fonction pour obtenir la température
function getTemp() {
  navigator.geolocation.getCurrentPosition(success, error, options); // Obtenir la position actuelle de l'utilisateur
}

// Fonction de succès pour la géolocalisation
async function success(pos) {
  const crd = pos.coords; // Extrayez les coordonnées de la position
  let url =
    "https://weather.contrateumdev.com.br/api/weather?lat=" +
    crd.latitude +
    "&lon=" +
    crd.longitude;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let temp = parseInt(data.main.temp); // Extrait la température de la réponse
      let contry = data.name; // Extrait le nom de la ville
      let weather = data.weather; // Extrait les données météorologiques

      tempMessage.textContent = temp + " °C"; // Affiche la température
      nameMessage.textContent = "à " + contry; // Affiche le nom de la ville
      weatherMessage.textContent = "il fait " + weather[0].main; // Affiche la météo principale
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des utilisateurs : ",
        error
      );
    });
}

// Fonction pour gérer les erreurs de géolocalisation
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
