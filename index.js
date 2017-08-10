var https = require('https');
var http = require('http');

var express = require('express');
var app = express();
var request = require("request")

var crypto_url = [
					"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,USD,EUR",
					"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=LTC,USD,EUR",
					"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=DOGE,USD,EUR",
					"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=ETH,USD,EUR",
					"https://www.cryptopia.co.nz/api/GetMarket/DCN_BTC",
					"https://www.cryptopia.co.nz/api/GetMarket/DCN_LTC",
					"https://www.cryptopia.co.nz/api/GetMarket/DCN_DOGE"
				];

var DCN = 800000;
var BTC;
var LTC;
var DOGE;
var ETH;
var DCN_BTC;
var DCN_LTC;
var DCN_DOGE;


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


crypto_url.map(function (item){
	request({
		url: item,
		json: true
		}, function (error, response, body) {

	    	if (!error && response.statusCode === 200) {

	    		//console.log(body);

				if(body["BTC"] !== undefined){
			    	BTC = body;
					console.log("BTC");
				}else if(body["LTC"] !== undefined){
			    	LTC = body;
	    			console.log("LTC");
				}else if(body["DOGE"] !== undefined){
			    	DOGE = body;
	    			console.log("DOGE");
				}else if(body["ETH"] !== undefined){
			    	ETH = body;
	    			console.log("ETH");

				}else if(body.Data.Label === "DCN/BTC"){
			    	DCN_BTC = body.Data;
	    			console.log("DCN_BTC");
				}else if(body.Data.Label === "DCN/LTC"){
			    	DCN_LTC = body.Data;
	    			console.log("DCN_LTC");
				}else if(body.Data.Label === "DCN/DOGE"){
			    	DCN_DOGE = body.Data;
	    			console.log("DCN_DOGE");
				}							

    		}
		})
	
});		


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index', {DCN: DCN, BTC: BTC, LTC: LTC, DOGE: DOGE, ETH: ETH, DCN_BTC: DCN_BTC, DCN_LTC: DCN_LTC, DCN_DOGE: DCN_DOGE});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
