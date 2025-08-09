const {Pool} = require('pg');
const { connectionString } = require('pg/lib/defaults');
// require('dotenv').config()
module.exports = new Pool({
    // host: "localhost", // or wherever the db is hosted
    // user: "leonliu",
    // database: "top_users",
    // // password: "ll368",
    // port: 5432 // The default port
    connectionString: process.env.CONNECTION_STRING
  });