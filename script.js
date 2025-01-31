// Gestion des armes
const armesFeuInput = document.getElementById("armesFeuInput");
const armesFeuTextarea = document.getElementById("armesFeu");
const armesBlanchesInput = document.getElementById("armesBlanchesInput");
const armesBlanchesTextarea = document.getElementById("armesBlanches");

// Objets pour stocker les armes sélectionnées et leur quantité
let armesFeuSelectionnees = {};
let armesBlanchesSelectionnees = {};

// Ajouter une arme à feu
armesFeuInput.addEventListener("change", () => {
  const arme = armesFeuInput.value.trim();
  if (arme) {
    if (armesFeuSelectionnees[arme]) {
      armesFeuSelectionnees[arme] += 1; // Incrémenter le compteur
    } else {
      armesFeuSelectionnees[arme] = 1; // Ajouter l'arme avec un compteur à 1
    }
    mettreAJourArmesFeu();
  }
  armesFeuInput.value = ""; // Réinitialiser l'input
});

// Ajouter une arme blanche
armesBlanchesInput.addEventListener("change", () => {
  const arme = armesBlanchesInput.value.trim();
  if (arme) {
    if (armesBlanchesSelectionnees[arme]) {
      armesBlanchesSelectionnees[arme] += 1; // Incrémenter le compteur
    } else {
      armesBlanchesSelectionnees[arme] = 1; // Ajouter l'arme avec un compteur à 1
    }
    mettreAJourArmesBlanches();
  }
  armesBlanchesInput.value = ""; // Réinitialiser l'input
});

// Mettre à jour la zone de texte des armes à feu
function mettreAJourArmesFeu() {
  const armes = Object.entries(armesFeuSelectionnees)
    .map(([arme, quantite]) => `${quantite}x ${arme}`)
    .join(", ");
  armesFeuTextarea.value = armes;
}

// Mettre à jour la zone de texte des armes blanches
function mettreAJourArmesBlanches() {
  const armes = Object.entries(armesBlanchesSelectionnees)
    .map(([arme, quantite]) => `${quantite}x ${arme}`)
    .join(", ");
  armesBlanchesTextarea.value = armes;
}

// Fonction pour formater le véhicule de fuite
function formatVehiculeFuite(input) {
  const plaqueRegex = /[A-Za-z]{2}\d{4}[A-Za-z]{2}/;
  const proprietaireRegex = /[A-Za-z]+ [A-Za-z]+/;

  const plaqueMatch = input.match(plaqueRegex);
  const plaque = plaqueMatch ? plaqueMatch[0] : null;

  const proprietaireMatch = input.match(proprietaireRegex);
  const proprietaire = proprietaireMatch ? proprietaireMatch[0] : null;

  let modele = input
    .replace(plaqueRegex, "")
    .replace(proprietaireRegex, "")
    .trim()
    .replace(/[\/,]/g, "")
    .trim();

  if (!plaque || !proprietaire || !modele) {
    return "Erreur : Format incorrect. Assurez-vous d'avoir un propriétaire (Nom Prénom), une plaque (AA9999AA) et un modèle.";
  }

  return `🏎️ Modèle : ${modele}\n🥷 Propriétaire : ${proprietaire}\n🔢 Plaque : ${plaque}`;
}

// Générer le modèle
function generatePattern() {
  const resultDiv = document.getElementById("result");

  const revendications =
    document.getElementById("revendications").value || "Aucune";
  const nbBraqueurs = document.getElementById("nbBraqueurs").value || "3";
  const nbOtages = document.getElementById("nbOtages").value || "3";
  const armesFeu = armesFeuTextarea.value || "Aucune";
  const armesBlanches = armesBlanchesTextarea.value || "Aucune";
  const negociation = document.getElementById("negociation").value || "Aucune";
  const vehiculeFuite =
    document.getElementById("vehiculeFuite").value || "Non renseigné";

  const vehiculeFormate = formatVehiculeFuite(vehiculeFuite);

  resultDiv.textContent = `🎭 𝑹𝒆𝒗𝒆𝒏𝒅𝒊𝒄𝒂𝒕𝒊𝒐𝒏 :
${revendications}

👥 𝑬𝒇𝒇𝒆𝒄𝒕𝒊𝒇 :
🥷 ${nbBraqueurs} Braqueurs
🧍‍♀️ ${nbOtages} Otages

⚔️ 𝑨𝒓𝒎𝒆𝒎𝒆𝒏𝒕 :
🔫 ${armesFeu}
🔪 ${armesBlanches}

📞  𝑵𝒆́𝒈𝒐𝒄𝒊𝒂𝒕𝒊𝒐𝒏 :
${negociation}

🚘  𝑽𝒆́𝒉𝒊𝒄𝒖𝒍𝒆 𝒅𝒆 𝒇𝒖𝒊𝒕𝒆 :
${vehiculeFormate}

⭐ 𝐋𝐞𝐚𝐝 𝐓𝐞𝐫𝐫𝐚𝐢𝐧 : <@727770618090487808>
💥 𝐋𝐞𝐚𝐝 𝐍𝐞́𝐠𝐨𝒄𝒊𝒂𝒕𝒊𝒐𝒏 : @

🎯 𝑭𝒊𝒏 𝒅𝒆 𝒍'𝑶𝒑𝒆́𝒓𝒂𝒕𝒊𝒐𝒏 : code 4
-# 170 | Dorian Rossini
-# 🐍  Opérateur COBRA`;
}

// Copier le résultat
function copyToClipboard() {
  const resultDiv = document.getElementById("result");
  const text = resultDiv.textContent;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Texte copié dans le presse-papiers.");
    })
    .catch((err) => {
      console.error("Erreur lors de la copie :", err);
    });
}

// Réinitialiser le formulaire
function resetForm() {
  document.getElementById("revendications").value = "";
  document.getElementById("nbBraqueurs").value = "3";
  armesFeuSelectionnees = {};
  armesBlanchesSelectionnees = {};
  armesFeuTextarea.value = "";
  armesBlanchesTextarea.value = "";
  document.getElementById("negociation").value = "";
  document.getElementById("vehiculeFuite").value = "";
  document.getElementById("result").textContent = "";
}
