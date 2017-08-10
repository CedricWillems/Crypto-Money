var https = require('https');
var http = require('http');

var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var request = require("request")

var crypto_url = [
					"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR",
					"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=LTC,USD,EUR",
					"https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=DOGE,USD,EUR"
				];
var crypto_currency = [];

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


var url = "http://developer.cumtd.com/api/v2.2/json/GetStop?" +
    "key=d99803c970a04223998cabd90a741633" +
    "&stop_id=it"

crypto_url.map(function (item){
	request({
		url: item,
		json: true
		}, function (error, response, body) {

	    	if (!error && response.statusCode === 200) {
	    	console.log(body);
	        crypto_currency.push(body);
	    	}
		})
	
});		

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index', {BTC: crypto_currency[0], LTC: crypto_currency[1], DOGE: crypto_currency[2], name: 'Cedric'});
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
