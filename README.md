# rest-backend
REST backend repo


https://techfort.github.io/LokiJS/


How to deploy to AWS:
`npm install -g serverless`

`sls create -t aws-nodejs -n rest-backend`

`npm i serverless-http`

Add these lines to index.js
`const sls = require('serverless-http')`
`module.exports.server = sls(app)`

