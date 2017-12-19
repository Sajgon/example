const https = require("https");


function callApi(req){
  return new Promise(function(resolve,reject){
    https.request({
      host: "min-api.cryptocompare.com",
      path: "/data/" + req,
      method: 'GET'
    }, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        resolve(chunk);
      });
    }).end();
  });

}

async function main(){
  let result = await callApi("price?fsym=ETH&tsyms=BTC,USD,EUR");
  console.log(result);
}

main();
