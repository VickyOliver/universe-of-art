require('dotenv').config(); //necessário .env
const { MongoClient } = require("mongodb");

const uri = process.env.URI;
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        return client.db(process.env.NOME_DB);
    } catch (e) {
        console.error("Erroa ao conectar:", e);
    }
}

module.exports = connect;