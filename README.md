# rest-backend
REST backend repo



---

Was wir gelernt haben:
- Wie man Endpunkte definieren kann
- Wie man Routes gruppieren kan (/pokemon, /trainers)
- Wie man 3rd party APIs integrieren kann
- Wie man DB einbinden kann (mit Beispiel in-memory)

Nächste Aufgaben:
- Geht in eigenen Team Call
- Baut eure eigene API nach Anforderung
- Siehe unten "How to create nodejs with express"
- 



---

## How to create nodejs with express:

- Projekt-Ordner erstellen z.B. `mkdir pokedex-backend`
- Geh ins Ordner rein z.B. `cd pokedex-backend`
- `npm init` -> Eingabetaste mehrmals drucken bis fertig ist
- `npm i -g express`
- `npm i express axios lokijs nodemon`
- In package.json, ersetze "scripts" durch:
```
"scripts": {
    "start": "node index.js",
    "watch:dev": "nodemon"
},
"nodemonConfig": {
    "exec": "npm run start",
    "watch": [
        "routes/*",
        "index.js"
    ],
    "ignore": [
        "**/__tests__/**",
        "*.test.js",
        "*.spec.js"
    ]
},
```

---

## API Anforderung:

### Basics
1. GET '/' mit "Hello World" als response
2. POST '/' mit {"text": "Hallo Welt"} als Body, und komplett das Body als response zurückliefern

### Erweitert
1. POST '/pokemon' mit {"name": "Bulbasaur", "pokeId": "1"} als Body, in DB speichern, und komplett das Body als response zurückliefern.
2. POST '/pokemon' mit {"name": "Ivysaur", "pokeId": "2"} als Body, in DB speichern, und komplett das Body als response zurückliefern.
3. GET '/pokemon/:id', liefert entsprechend das Pokemon zurück, ansonsten 404 mit "Pokemon with id xx not found"
4. GET '/pokedex/:id', liefert das Pokemonname von https://pokeapi.co/api/v2/pokemon/ zurück (Einbindung 3rd party API)


lokijs Doku: https://techfort.github.io/LokiJS/


---

How to deploy to AWS:
`npm install -g serverless`

`sls create -t aws-nodejs -n rest-backend`

`npm i serverless-http`

Add these lines to index.js
`const sls = require('serverless-http')`
`module.exports.server = sls(app)`

