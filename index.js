var https = require('https');
var http = require('http');

var express = require('express');
var app = express();
var request = require("request")

var cryptocompare_url = [
					"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,USD,EUR",
					"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=LTC,USD,EUR",
					"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=DOGE,USD,EUR",
					"https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=ETH,USD,EUR",
];

var cryptopia_url = [
					"https://www.cryptopia.co.nz/api/GetMarket/DCN_BTC",
					"https://www.cryptopia.co.nz/api/GetMarket/DCN_LTC",
					"https://www.cryptopia.co.nz/api/GetMarket/DCN_DOGE",
];

var coinmarketcap_url = [
					"https://api.coinmarketcap.com/v1/ticker/dentacoin/",
					"https://api.coinmarketcap.com/v1/ticker/neverdie/",
];

// Etherscan Wallet
var ES_ETH_WALLET;

// Prices Cryptocompare
var CC_BTC;
var CC_LTC;
var CC_DOGE;
var CC_ETH;

// Dentacoin
const DCN = 800000;

// Dentacoin Cryptopia
var C_DCN_BTC;
var C_DCN_LTC;
var C_DCN_DOGE;

// Dentacoin Cryptopia
var CMC_DCN_BTC;

// Neverdie 
const NDC = 84;

// Neverdie Coin Market Cap
var CMC_NDC_BTC;


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

request({
	url: "https://api.etherscan.io/api?module=account&action=balance&address=0xea4686C4bd1023d0c888079600c594efd524B7Aa&tag=latest&apikey=RVGA3SRP9YA1DDCECR8UQN81RV79PFV8ZJ",
	json: true
	}, function (error, response, body) {
    	if (!error && response.statusCode === 200) {
    		ES_ETH_WALLET = body.result/1000000000000000000;	
    		console.log("ETH_WALLET");	
		}
	})

cryptocompare_url.map(function (item){
	request({
		url: item,
		json: true
		}, function (error, response, body) {

	    	if (!error && response.statusCode === 200) {

	    		//console.log(body);
				if(body["BTC"] !== undefined){
			    	CC_BTC = body;
					console.log("BTC");
				}else if(body["LTC"] !== undefined){
			    	CC_LTC = body;
	    			console.log("LTC");
				}else if(body["DOGE"] !== undefined){
			    	CC_DOGE = body;
	    			console.log("DOGE");
				}else if(body["ETH"] !== undefined){
			    	CC_ETH = body;
	    			console.log("ETH");
				}

    		}
		})		
});


cryptopia_url.map(function (item){
	request({
		url: item,
		json: true
		}, function (error, response, body) {

	    	if (!error && response.statusCode === 200) {

	    		//console.log(body);
				
				if(body.Data.Label === "DCN/BTC"){
			    	C_DCN_BTC = body.Data;
	    			console.log("C_DCN_BTC");
				}else if(body.Data.Label === "DCN/LTC"){
			    	C_DCN_LTC = body.Data;
	    			console.log("C_DCN_LTC");
				}else if(body.Data.Label === "DCN/DOGE"){
			    	C_DCN_DOGE = body.Data;
	    			console.log("C_DCN_DOGE");
				}	

    		}
		})	
});		

coinmarketcap_url.map(function (item){
	request({
		url: item,
		json: true
		}, function (error, response, body) {

			//console.log(body[0]);

	    	if (!error && response.statusCode === 200) {
				if(body[0].id === "neverdie"){
			    	CMC_NDC_BTC = body[0];
	    			console.log("CMC_NDC_BTC");
//	    			console.log(CMC_NDC_BTC);
				}else if(body[0].id === "dentacoin"){
			    	CMC_DCN_BTC = body[0];
	    			console.log("CMC_DCN_BTC");
//	    			console.log(CMC_DCN_BTC);
				}	


    		}
		})	
})

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(request, response) {
  response.render('pages/index', {
// Etherscan wallet
  	ES_ETH_WALLET: ES_ETH_WALLET, 
// Coin Market prices
	CC_BTC: CC_BTC, CC_LTC: CC_LTC, CC_DOGE: CC_DOGE, CC_ETH: CC_ETH, 
// Constants
	DCN: DCN, NDC: NDC, 
// Cryptopia Dentacoin
  	C_DCN_BTC: C_DCN_BTC, C_DCN_LTC: C_DCN_LTC, C_DCN_DOGE: C_DCN_DOGE, 
// Coin Market Cap Dentacoin
 	CMC_DCN_BTC: CMC_DCN_BTC,
// Coin Market Cap Neverdie
  	CMC_NDC_BTC: CMC_NDC_BTC,});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
