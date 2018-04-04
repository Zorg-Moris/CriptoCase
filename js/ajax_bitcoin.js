"use strict"


async function getCurrentRate() {

    let currentPrice;

    try {
        await $.ajax({
            url: "https://api.coindesk.com/v1/bpi/currentprice.json",
            type: 'GET',

            success: function (data) {
                data = JSON.parse(data);
                let symbol = data.bpi.USD.symbol;
                currentPrice = data.bpi.USD.rate_float;
                bitcoinRate.setCurrentRate(currentPrice);
                let fixedPrice = data.bpi.USD.rate_float;
                fixedPrice = fixedPrice.toFixed(2);
                $("#price").html(symbol + fixedPrice);
            }
        });
        return currentPrice;
    } catch (error) {

        console.error(error);
    }
};

async function getCurrentRateYesterday() {
    let yesterdayPrice;
   
    try {
        await $.ajax({
            url: "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday",
            type: "GET",
            success: function (data) {
                data = JSON.parse(data);

                for (var key in data.bpi) {
                    yesterdayPrice = data.bpi[key];
                    bitcoinRate.setYesterdayRate(yesterdayPrice);
                }
            }
        })
        return yesterdayPrice;

    } catch (error) {
        console.error(error);

    }
};


function getHistoricalRate() {
    let startDate = String(bitcoinRate.getStartDate());
    let endDate = String(bitcoinRate.getEndDate());

    try {
        $.ajax({
            url: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`,
            type: "GET",
            success: function (data) {
                data = JSON.parse(data);

                bitcoinRate.clenerHRate();
                bitcoinRate.clenerHDate();

                for (var key in data.bpi) {

                    let dateFormat = moment(key).format("MMM Do YY");

                    bitcoinRate.setHistoricalRate(data.bpi[key]);
                    bitcoinRate.setHistoricalDate(dateFormat);
                }
            }
        })
    } catch (error) {
        console.error(error);
    }
};

