const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/submit', (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    newUser.save((err) => {
        if (err) return res.send('Erreur lors de l\'enregistrement des données.');
        res.send('Vos informations ont été enregistrées avec succès.');
    });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});