// Importando módulos
const express = require('express');
const fs = require('fs');
const { connect } = require('http2');
const app = express();
const PORT = 3000;
const connect2 = require("./config/db");
let artists = [];

// Configurando EJS como template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Rota principal
app.get('/', async (req, res) => {
    const db = await connect2();
    artists = await db.collection("artists").find().toArray();
    res.render('index', { artists });
});

// Rota para detalhes do artista 
app.get('/artist/:name', (req, res) => {
    const artist = artists.find(a => a.name === req.params.name);
    if (artist) {
        res.render('artist', { artist });
    } else {
        res.status(404).send('Artista não encontrado');
    }
});

app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase(); // Obtém o texto digitado na barra de pesquisa
    const filteredArtists = artists.filter(artist => 
        artist.name.toLowerCase().includes(query)
    );

    res.render('index', { artists: filteredArtists });
});


// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
