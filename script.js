const backendUrl = "http://localhost:3000";  // Remplace par l'URL de ton backend si déployé

async function ajouterAvis() {
    const phase = document.getElementById('phase').value;
    const tache = document.getElementById('tache').value;
    const defaillance = document.getElementById('defaillance').value;
    const gravite = parseInt(document.getElementById('gravite').value);
    const occurence = parseInt(document.getElementById('occurence').value);
    const detectabilite = parseInt(document.getElementById('detectabilite').value);
    const rpn = gravite * occurence * detectabilite;

    if (!phase || !tache || !defaillance || !gravite || !occurence || !detectabilite) {
        alert("Merci de remplir tous les champs avant d’ajouter un avis.");
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/ajouter-avis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phase, tache, defaillance, gravite, occurence, detectabilite, rpn })
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Avis bien enregistré !");
        } else {
            alert("Erreur : " + result.message);
        }
    } catch (error) {
        alert("Erreur de connexion au serveur.");
        console.error(error);
    }
}
