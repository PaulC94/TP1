const url = "https://api.restcountries.com/countries/v5";
const cle = "rc_live_774c00b66c624baeb2217417f0875a77";

function transformerPays(pays) {
    return {
        nom: pays.names.common,
        capitale: pays.capitals && pays.capitals.length > 0
            ? pays.capitals[0].name
            : "Inconnue",
        region: pays.region,
        population: pays.population,
        code: pays.codes.alpha_3
    };
}

export async function chercherPays(nom) {
    const reponse = await fetch(
        url + "?q=" + encodeURIComponent(nom) + "&api-key=" + cle
    );

    if (!reponse.ok) {
        throw new Error("Erreur HTTP " + reponse.status);
    }

    const donnees = await reponse.json();

    return donnees.data.objects.map(transformerPays);
}

export async function chargerEurope() {
    const reponse = await fetch(
        url + "/region/Europe?limit=100&api-key=" + cle
    );

    if (!reponse.ok) {
        throw new Error("Erreur HTTP " + reponse.status);
    }

    const donnees = await reponse.json();

    return donnees.data.objects.map(transformerPays);
}