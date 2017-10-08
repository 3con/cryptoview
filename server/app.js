const express = require('express');
const graphqlHTTP = require('express-graphql');
const axios = require('axios');
const path = require('path');
const app = express();
const serveStatic = require('serve-static');

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic(path.resolve(__dirname, '../build/')))
}
// TODO: Fix GraphQL Endpoint. Schema is not structured correctly
// const schema = require('../graphql/schema/schema.js');

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true
// }));

app.get('/api/charts/marketprice', (req,res) => {
  axios.get(' https://api.blockchain.info/charts/market-price')
    .then(response => res.status(200).send(response.data))
    .catch(error => res.status(405).send(error));
});

app.listen(4000);
console.log('Listening on 4000...')
