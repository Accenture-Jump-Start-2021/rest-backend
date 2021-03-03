const express = require('express');
const loki = require('lokijs');
const axios = require('axios');

const app = express();
const router = express.Router();
const pokedexRemoteUrl = 'https://pokeapi.co/api/v2/pokemon/';


var db = new loki('trainers.db');


// Add a collection to the database
var trainers = db.addCollection('trainers');

router.post('/', async(req, res) => {
    trainers.insert(req.body);
    res.status(201).send(req.body);
});

router.get('/', async(req, res) => {
    res.send(trainers.data);
});

router.get('/:id', async(req, res) => {
    var id = req.params.id;
    var result = trainers.findOne({'id': id});
    if (result) {
        res.send(result)
    } else {
        res.status(404).send(`Trainer with id ${id} not found`)
    }
});

router.get('/:id/pokemon', async(req, res) => {
    var id = req.params.id;
    var trainer = trainers.findOne({'id': id});

    console.log(trainer);
    
    if (trainer) {
        Promise.all(trainer.pokemon.map(pokeid => {
            return axios.get(`${pokedexRemoteUrl}${pokeid}`).then(poke => {
                console.log('poke: ', poke.data.name);
                return poke.data.name;
            });
        })).then(response => {
            console.log(response);
            res.send(response);
        })
    }
})

router.get('/:id/starter-pokemon', async(req, res) => {
    var trainerid = req.params.id;
    var trainer = trainers.findOne({'id': trainerid});

    if (trainer) {
        axios.get(`${pokedexRemoteUrl}${trainer.starter}`).then(poke => {
            console.log('starter pokemon: ', poke.data.name);
            res.send(poke.data.name)
        });
    }
})

module.exports = router;
