const express = require('express');
const loki = require('lokijs');

const router = express.Router();
const pokedexRemoteUrl = 'https://pokeapi.co/api/v2/pokemon/';

var db = new loki('sandbox.db');

// Add a collection to the database
const pokemonCollection = db.addCollection('pokemon');

router.post('/', (req, res) => {
    pokemonCollection.insert(req.body);
    res.status(201).send(req.body);
});

router.get('/:pokeid', (req, res) => {
    const id = req.params.pokeid;
    const pokemon = pokemonCollection.find({pokeId: id});
    if(pokemon.length > 0) {
        res.send(pokemon)
    } else {
        res.status(404).send(`Pokemon with id ${id} not found`)
    }
});

module.exports = router;
