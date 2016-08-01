var express = require('express');
var bodyParser = require('body-parser');

var valid = require('./valid.js');
var db = require('./db.js');

var app = express();

app.use(express.static('static'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/submit', valid.textarea, db.submitOrder, function(req, res) {
  res.redirect('/orders/' + req.orderNo);
});

app.get('/orders/:orderNo', valid.order, db.getOrder, function(req, res) {
  res.json({'order': req.orderNo, 'delivery': req.deliveryDate});
});

app.use(function(req, res, next) {
  res.status(404).json({'error': 'not found'});
});

app.listen(3000);
