// Importando módulos
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Configurando EJS como template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Carregar dados dos artistas
const artists = JSON.parse(fs.readFileSync('artists.json', 'utf8'));

// Rota principal
app.get('/', (req, res) => {
    res.render('index', { artists });
});

// Rota para detalhes do artista
app.get('/artist/:id', (req, res) => {
    const artist = artists.find(a => a.id === parseInt(req.params.id));
    if (artist) {
        res.render('artist', { artist });
    } else {
        res.status(404).send('Artista não encontrado');
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
