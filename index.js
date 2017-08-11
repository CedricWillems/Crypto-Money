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
					"https://www.cryptopia.co.nz/api/GetMarket/DCN_DOGE",
				];

var neverdie_url = [
					"https://api.coinmarketcap.com/v1/ticker/neverdie/",
];

// Etherscan Wallet
var ETH_WALLET;

// Dentacoin
var DCN = 800000;
var BTC;
var LTC;
var DOGE;
var ETH;
var DCN_BTC;
var DCN_LTC;
var DCN_DOGE;

// Neverdie
var NDC = 84;
var NDC_BTC = 5;


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

request({
		url: "https://api.etherscan.io/api?module=account&action=balance&address=0xea4686C4bd1023d0c888079600c594efd524B7Aa&tag=latest&apikey=RVGA3SRP9YA1DDCECR8UQN81RV79PFV8ZJ",
		json: true
		}, function (error, response, body) {
	    	if (!error && response.statusCode === 200) {
	    		ETH_WALLET = body.result/1000000000000000000;	
	    		console.log("ETH_WALLET");	
    		}
		})

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

neverdie_url.map(function (item){
	request({
		url: item,
		json: true
		}, function (error, response, body) {

	    	if (!error && response.statusCode === 200) {
				if(body[0].id === "neverdie"){
			    	NDC_BTC = body[0];
	    			console.log("NDC_BTC");
				}	

    		}
		})	
})

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index', {ETH_WALLET: ETH_WALLET, DCN: DCN, BTC: BTC, LTC: LTC, DOGE: DOGE, ETH: ETH, DCN_BTC: DCN_BTC, DCN_LTC: DCN_LTC, DCN_DOGE: DCN_DOGE, NDC: NDC, NDC_BTC: NDC_BTC});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
