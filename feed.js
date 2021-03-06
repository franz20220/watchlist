//test
const WebSocket = require('ws');
const socket = new WebSocket('wss://ws.finnhub.io?token=br948dvrh5rbhn68uad0');

var onChangeHandler;
var stock;
var stocks = [
    {symbol: "AAPL", open: 180.00},
    {symbol: "MSFT", open: 9692.43},
    {symbol: "BINANCE:BTCUSDT", open: 9692.43},
];
var counter = 0;
var symbol;
var mod_counter;

stocks.forEach(function(stock) {
    stock.last = stock.open;
    stock.high = stock.open;
    stock.low = stock.open;
});


// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
//    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'MSFT'}))
   socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
//    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});



// Listen for messages
socket.addEventListener('message', function (event) {
//    console.log('Message from server ', event.data);

    let obj = JSON.parse(event.data);

    if(obj.data === undefined) {
        // Object is empty (Would return true in this example)
    } else {
        //    console.log('Price', obj.data[0].p);

        //console.log('Symbol:', obj.data[0].s, ',', 'Price:', obj.data[0].p);

//nur zum Testen         
        counter += 1;
        mod_counter = counter % 3;
        switch (mod_counter) {
            case 0:
                obj.data[0].s = "AAPL";
                obj.data[0].p = obj.data[0].p / 400;
                break;
            case 1:
                obj.data[0].s = "MSFT";
                obj.data[0].p = obj.data[0].p / 200;
                break;
            case 2:
                obj.data[0].s = "BINANCE:BTCUSDT";    
                break;                             
        }

        
        console.log('Symbol:', obj.data[0].s, ',', 'Price:', obj.data[0].p);
//Ende nur zum Testen

        for (var i = 0; i < stocks.length; ++i) {
            if (stocks[i]['symbol'] === obj.data[0].s) {
                stocks[i]['last'] = obj.data[0].p;            
                stock = stocks[i];
            }
        }

        onChangeHandler(stock.symbol, 'stock', stock);
    }


});

function start(onChange) {
    onChangeHandler = onChange;
//    interval = setInterval(simulateChange, 200);
}

function stop() {
//    clearInterval(interval);
}

exports.start = start;
exports.stop = stop;



// var interval,
//     onChangeHandler;

// var stocks = [
//     {symbol: "GM", open: 38.87},
//     {symbol: "GE", open: 25.40},
//     {symbol: "MCD", open: 97.05},
//     {symbol: "UAL", open: 69.45},
//     {symbol: "WMT", open: 83.24},
//     {symbol: "AAL", open: 55.76},
//     {symbol: "LLY", open: 76.12},
//     {symbol: "JPM", open: 61.75},
//     {symbol: "BAC", open: 15.84},
//     {symbol: "BA", open: 154.50}
// ];

// stocks.forEach(function(stock) {
//     stock.last = stock.open;
//     stock.high = stock.open;
//     stock.low = stock.open;
// });

// function simulateChange() {

//     var index = Math.floor(Math.random() * stocks.length),
//         stock = stocks[index],

//         maxChange = stock.open * 0.005,
//         change = maxChange - Math.random() * maxChange * 2,
//         last;

//     change = Math.round(change * 100) / 100;
//     change = change === 0 ? 0.01 : change;

//     last = stock.last + change;

//     if (last > stock.open * 1.15 || last < stock.open * 0.85)
//     {
//         change = -change;
//         last = stock.last + change;
//     }

//     stock.change = change;
//     stock.last = Math.round(last * 100) / 100;
//     if (stock.last > stock.high) {
//         stock.high = stock.last;
//     }
//     if (stock.last < stock.low) {
//         stock.low = stock.last;
//     }
//     onChangeHandler(stock.symbol, 'stock', stock);
// }

// function start(onChange) {
//     onChangeHandler = onChange;
//     interval = setInterval(simulateChange, 200);
// }

// function stop() {
//     clearInterval(interval);
// }

// exports.start = start;
// exports.stop = stop;