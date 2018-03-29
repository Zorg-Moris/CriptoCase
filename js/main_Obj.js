"use strict"


function Rate() {

    grapfDate.apply(this, arguments);

    let _currentPrice = 0;
    let _yesterdayPrice = 0;

    let _historicalRate = [];
    let _historicalDate = [];

    this.setCurrentRate = function (current) {
        _currentPrice = current;
    }

    this.getCurrentRate = function () {
        return _currentPrice;
    }

    this.setYesterdayRate = function (yesterday) {
        _yesterdayPrice = yesterday;
    }

    this.getYesterdayRate = function () {
        return _yesterdayPrice;
    }

    this.setHistoricalRate = function (price) {

        _historicalRate.push(price);
    }

    this.getHistoricalRate = function () {
        return _historicalRate;
    }

    this.setHistoricalDate = function (date) {

        _historicalDate.push(date);
    }

    this.getHistoricalDate = function () {
        return _historicalDate;
    }

    this.clenerHDate = function () {
        _historicalDate.length = 0;
    }

    this.clenerHRate = function () {
        _historicalRate.length = 0;
    }
};


// Rate.prototype.prices = function () {
//     let price = this.getHistoricalRate();
//     return price;
// };

// Rate.prototype.date = function () {
//     let date = this.getHistoricalDate();
//     return date;
// };

var myChart;

Rate.prototype.grapf = function () {
    var ctx = document.getElementById("myChart").getContext('2d');
    //var ctx = $("#myChart");
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.getHistoricalDate(),
            datasets: [{
                label: '# of Votes',
                data: this.getHistoricalRate(),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            }]
        },
        options: {
            tooltips: {
                borderColor: 'rgb(233, 150, 122)',
                backgroundColor: 'rgb(138, 43, 226)'
            },

            animation: {
                duration: 3000,
                easing: 'easeOutBack' //'easeInOutBack'
            },

            scales: {
                yAxes: [{

                    ticks: {
                        suggestedMin: this.minGrapfValue(),
                        suggestedMax: this.maxGrapfValue(),
                        stepSize: 200
                    }
                }]
            }
        }
    });
};


Rate.prototype.minGrapfValue = function () {
    let price = this.getHistoricalRate();
    let res = Math.min.apply(null, price);
    res = Math.floor(res / 100) * 100 - 300;
    return res;
};

Rate.prototype.maxGrapfValue = function () {
    let price = this.getHistoricalRate();
    let res = Math.max.apply(null, price);
    res = Math.floor(res / 100) * 100 + 300;
    return res;
};

function grapfDate() {

    let _startDate = 0;
    let _endDate = 0;

    this.setStartDate = function (start) {
        _startDate = start;
    }

    this.getStartDate = function () {
        return _startDate;
    }

    this.setEndDate = function (end) {
        _endDate = end;
    }
    this.getEndDate = function () {
        return _endDate;
    }

};



//Rate.prototype = Object.create(grapfDate.prototype);
//grapfDate.prototype = Object.create(Rate.prototype);

let bitcoinRate = new Rate();
let rippleRate = new Rate();