import { chercherPays, chargerEurope } from "./api.js";

const recherche = document.querySelector("#recherche");
const resultats = document.querySelector("#resultats");
const statut = document.querySelector("#statut");
const reessayer = document.querySelector("#reessayer");

function afficherPays(pays) {
    resultats.innerHTML = "";

    if (pays.length === 0) {
        statut.textContent = "Aucun pays trouvé.";
        return;
    }

    pays.forEach(p => {
        const article = document.createElement("article");

        const titre = document.createElement("h3");
        titre.textContent = p.nom;

        const capitale = document.createElement("p");
        capitale.textContent = "Capitale : " + p.capitale;

        const region = document.createElement("p");
        region.textContent = "Région : " + p.region;

        const population = document.createElement("p");
        population.textContent =
            "Population : " + p.population.toLocaleString("fr-FR");

        article.append(
            titre,
            capitale,
            region,
            population
        );

        resultats.appendChild(article);
    });

    statut.textContent = pays.length + " résultat(s)";
}

async function rechercher() {
    const nom = recherche.value.trim();

    if (nom === "") {
        statut.textContent = "Écris le nom d'un pays.";
        resultats.innerHTML = "";
        return;
    }

    statut.textContent = "Chargement...";
    resultats.innerHTML = "";

    try {
        const pays = await chercherPays(nom);
        afficherPays(pays);
    } catch (erreur) {
        statut.textContent = "Erreur : " + erreur.message;
    }
}

recherche.addEventListener("input", () => {
    clearTimeout(recherche.timer);

    recherche.timer = setTimeout(() => {
        rechercher();
    }, 300);
});

reessayer.addEventListener("click", rechercher);

chargerEurope()
    .then(afficherPays)
    .catch((erreur) => {
        statut.textContent = "Erreur : " + erreur.message;
    });