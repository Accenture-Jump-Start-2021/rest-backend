const express = require('express');
const pokemonRoute = require('./routes/pokemon');
const axios = require('axios');

const PORT = '3000';
const app = express();

app.use(express.json());
app.use('/pokemon', pokemonRoute);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.post('/', (req, res) => {
    res.send(req.body);
});

app.get('/pokedex/:id', async (req, res) => {
    const id = req.params.id;
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
    res.send(response.data.name);

});


module.exports.handler = () => {
    app.listen(PORT, () => console.log(`Node listening on port ${PORT}`));
}
