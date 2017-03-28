
var express = require('express');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var app = express();

app.use(bodyParser.urlencoded());
app.use(expressJWT({ secret: 'bruno-leite' }).unless( { path: ['/login'] } ));

app.all('/login', function (req, res) {

  var pass = 'batata';

  if (!req.body.username) {
    res.status(400).send('username required');
    return;
  }
  if (!req.body.password || req.body.password != pass) {
    res.status(400).send('password required or invalid');
    return;
  }

  var myToken = jwt.sign({ username: req.body.username }, 'bruno-leite');
  res.status(200).json(myToken);
  

})

app.all('/hello', function (req, res) {
  res.status(200).send('Ola');
})
app.listen(80, function () {
  console.log('it has started');
})