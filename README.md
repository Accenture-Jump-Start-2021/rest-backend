# rest-backend
REST backend repo

## Local Build:

1. Git Bash oder VS Code Terminal (empfohlen) unter z.B. C://repos/jumpstart-repo-collection/ aufmachen

2. `git clone https://github.com/Accenture-Jump-Start-2021/rest-backend/`

3. `cd rest-backend`

4. `npm i`

5. `npm run watch:dev`

---

## How to create nodejs backend with express:
- Git Bash oder VS Code Terminal (empfohlen) unter z.B. C://repos/jumpstart-repo-collection/ aufmachen
- Ein neues Projekt-Ordner erstellen z.B. `mkdir pokedex-backend`
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
- Um server zu starten: `npm run watch:dev`
- Um server manuell zu stoppen: Strg+C


### How to deploy to AWS Lambda (This is general how-to. Starting here, you can also do it inside your own Backend-Repo):

0. Geh mal zu AWS -> IAM -> Roles:
- Klick auf euer Name
- Geh zum Tab "Security Credentials"
- Unter Access Keys, klick auf "Create Access Key".
- Kopier mal sowohl "Access Key ID" und "Secret Access Key" z.B. in Notepad rein


1. `npm i -g serverless`, und danach:
- Im VS Code Terminal, führe `sls config credentials --provider aws --key {{DEIN Access Key ID}} --secret {{DEIN Secret Access Key}}` aus, ohne die Klammer {{...}} 

2. `npm i serverless-http`

3. `sls create -t aws-nodejs -n rest-backend` (sls ist Abkürzung für serverless). Dieses Befehl erzeugt einige neue Dateien.

4. Die Datei handler.js löschen

4. Edit the root index.js:
    
    1. Add this to second line:
    `const sls = require('serverless-http')`

    2. Completely remove app.listen(...); and replace it with this line:
    `module.exports.server = sls(app)`

5. Completely delete the content of serverless.yml and replace it with this (see {{...}} for parts that you need to change manually):

```
# serverless.yml 
service: {{CHANGE IT TO YOUR OWN (OR YOUR TEAM) BACKEND NAME}}
provider: 
  name: aws 
  runtime: nodejs12.x 
  stage: dev 
  region: eu-central-1 
functions: 
    app: 
        handler: index.server # reference the file and exported method
        events: # events trigger lambda functions 
        - http: # this is an API Gateway HTTP event trigger 
            path: / 
            method: ANY 
            cors: true 
        - http: # all routes get proxied to the Express router 
            path: /{proxy+} 
            method: ANY 
            cors: true

```

6. Run `sls deploy`. Wenn es erfolgreich durch ist, dann solltet ihr die URL, mit der ihr euer Backend ansprechen könnt, irgendwo im Terminal sehen, sollte irgendwo fast am Ende der Meldungen vom Befehl stehen.


Diese Anleitung wird von https://medium.com/hackernoon/how-to-deploy-a-node-js-application-to-aws-lambda-using-serverless-ae7e7ebe0996 besorgt, mit einige Anpassungen.

---
---
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

### Hardcore
1. POST /trainers mit {"name": "Satoshi", "trainerId": "1", "starterPokemon": ""}
2. 

lokijs Doku: https://techfort.github.io/LokiJS/


---


