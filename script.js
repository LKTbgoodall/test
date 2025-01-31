const checks = {
  age: document.getElementById("age"),
  nationalite: document.getElementById("nationalite"),
  diplomes: document.getElementById("diplomes"),
  antecedents: document.getElementById("antecedents"),
  disponibilites: document.getElementById("disponibilites"),
  lettre: document.getElementById("lettre"),
  mail: document.getElementById("mail"),
  ia: document.getElementById("ia"),
};

const messages = {
  age: "Âge non requis",
  nationalite: "Nationalité non américaine",
  diplomes: "Diplôme non américain",
  antecedents: "Antécédents judiciaires présents",
  disponibilites: "Disponibilités faibles",
  lettre: "Lettre de motivation peu convaincante",
  mail: "Mail = Pseudo discord",
  ia: "Suspicion d'utilisation d'IA / Internet",
};

function generatePattern() {
  const resultDiv = document.getElementById("result");

  let motifs = [];
  for (const key in checks) {
    if (checks[key].checked) {
      motifs.push(messages[key]);
    }
  }

  if (motifs.length > 0) {
    resultDiv.textContent = `**Réponse Candidature**\nCandidat : @\nMotifs : ||** ${motifs.join(
      " | "
    )} **||\nBien à vous,\n**Gestionnaire PA - 170 | Dorian Rossini**`;
  } else {
    resultDiv.textContent = `**Réponse Candidature**\nCandidat : @\nMotifs : ** Félicitations ! Renommez vous prénom + nom**\nBien à vous,\n**Gestionnaire PA - 170 | Dorian Rossini**`;
  }
}

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

// Initial call to generate pattern
generatePattern();
