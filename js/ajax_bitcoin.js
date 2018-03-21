"use strict"

function getCurrentRate() {
    $.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json",
        function (data) {
            data = JSON.parse(data);

            console.log(data);

            let symbol = data.bpi.USD.symbol;
            let currentPrice = data.bpi.USD.rate_float;
            bitcoinRate.setCurrentRate(currentPrice);
            let fixedPrice = data.bpi.USD.rate_float;
            fixedPrice = fixedPrice.toFixed(2);
            $("#price").html(symbol + fixedPrice);
            //     return currentPrice;
            getCurrentRateYesterday(currentPrice);

        }
    );
};

function getCurrentRateYesterday(currentPrice) {
    $.get(
        "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday",
        function (data) {
            data = JSON.parse(data);

            console.log(data);
            console.log(data.bpi);

            let yesterdayPrice = 0;
            for (var key in data.bpi) {
                yesterdayPrice = data.bpi[key];
                bitcoinRate.setYesterdayRate(yesterdayPrice);

                console.log("yesterdayPrice: " + key);
                console.log("yesterdayPrice: " + yesterdayPrice);
                // return yesterdayPrice;

                calcProcent(currentPrice, yesterdayPrice);
            }

        }
    )
};
 
function getHistoricalRate() {
   let startDate = String (bitcoinRate.getStartDate());
    let endDate = String(bitcoinRate.getEndDate());
    $.get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`,
        function (data) {
            data = JSON.parse(data);

            console.log(data);
            console.log(data.bpi);

            bitcoinRate.clenerHRate();
            bitcoinRate.clenerHDate();

            for (var key in data.bpi) {
                // console.log("DATA: " + key);
                let dateFormat = moment(key).format("MMM Do YY");
                // console.log("DATA FORMAT: " + dateFormat);
                // console.log("RATE: " + data.bpi[key]);
                bitcoinRate.setHistoricalRate(data.bpi[key]);
                bitcoinRate.setHistoricalDate(dateFormat);
            }
        }
    )
};