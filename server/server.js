const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const db            = require('./config/db')

const app = express();

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true}));

MongoClient.connect("mongodb://teknobyen:tbknut123@ds259742.mlab.com:59742/tb_app", { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err)
  require('./routes')(app, database);
  app.listen(port, () => {
    console.log("We are live on " + port);
  })

})
