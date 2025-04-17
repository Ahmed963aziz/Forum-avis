// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Sert les fichiers statiques (ton HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));  // Serveer tout depuis le répertoire courant

// Connexion à MongoDB Atlas avec l'URI stocké dans les variables d'environnement
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur de connexion MongoDB :', err.message));

// Schéma Mongoose pour les avis
const AvisSchema = new mongoose.Schema({
  phase: String,
  tache: String,
  defaillance: String,
  gravite: Number,
  occurence: Number,
  detectabilite: Number,
  rpn: Number
});

const Avis = mongoose.model('Avis', AvisSchema);

// Route POST pour enregistrer un avis
app.post('/ajouter-avis', async (req, res) => {
  console.log("📩 Requête reçue : ", req.body);

  try {
    const { phase, tache, defaillance, gravite, occurence, detectabilite, rpn } = req.body;

    if (!phase || !tache || !defaillance || !gravite || !occurence || !detectabilite || !rpn) {
      return res.status(400).json({ message: 'Champs manquants dans la requête' });
    }

    const avis = new Avis({ phase, tache, defaillance, gravite, occurence, detectabilite, rpn });
    await avis.save();

    console.log("✅ Avis enregistré !");
    res.status(201).json({ message: 'Avis enregistré avec succès' });

  } catch (err) {
    console.error('❌ Erreur lors de l’enregistrement de l’avis :', err.message);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`));
