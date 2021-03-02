const express = require('express');
const router = express.Router();
const loki = require('lokijs');

const app = express();
var db = new loki('sandbox.db');

// Add a collection to the database
var pokemon = db.addCollection('pokemon');


router.post('/', (req, res) => {
    pokemon.insert(req.body);
    res.status(201).send(req.body);
});

router.get('/', (req, res) => {
    var poke = pokemon.data;
    res.send(poke);
});


router.get('/:pokeid', (req, res) => {
    var pokeid = req.params.pokeid;
    var poke = pokemon.findOne({'pokeid': pokeid});

    if (poke) {
        res.send(poke);
    } else {
        res.status(404).send(`Pokemon with Poke-ID ${pokeid} not found!`);
    }
});

router.put('/:pokeid', (req, res) => {
    var pokeid = req.params.pokeid;
    var poke = pokemon.findOne({'pokeid': pokeid});

    if (poke) {
        for (let item in req.body) {
            poke[item] = req.body[item]
        };
    
        pokemon.update(poke);
    
        res.send(poke);
    } else {
        res.status(404).send(`Pokemon with Poke-ID ${pokeid} not found!`);
    }
})


router.delete('/:pokeid', (req, res) => {
    var pokeid = req.params.pokeid;
    var poke = pokemon.findOne({'pokeid': pokeid});

    if (poke) {
        pokemon.remove(poke)
        res.status(204).send();
    } else {
        res.status(404).send(`Pokemon with Poke-ID ${pokeid} not found!`);
    }
})


module.exports = router;