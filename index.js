const express = require('express');
const pokemonRoute = require('./routes/pokemon');
const trainersRoute = require('./routes/trainers');

const PORT = '3000';
const app = express();

app.use(express.json());
app.use('/pokemon', pokemonRoute);
app.use('/trainers', trainersRoute);


app.all('/', (req, res, next) => {
    console.log('Here');
    next();
});

app.get('/', (req, res) => {
    res.send('Get request successful');
});

app.get('/greater-than-five/:num', (req, res) => {
    var num = req.params.num;
    if (num > 5) {
        res.send('success');
    } else {
        res.status(401).send('Not authorized');
    }
});


app.listen(PORT, () => {
    console.log(`Node listening on port ${PORT}`);
});
