"use strict"

function Rate() {
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

    this.clenerHDarr = function () {
        return _historicalDate.length = 0;
    }

    this.clenetHRarr = function () {
        return _historicalRate.length = 0;
    }

};

Rate.prototype.calendarDate = function (start, end) {
    this.startDate = start;
    this.endDate = end;
}

Rate.prototype.prices = function () {
    let price = this.getHistoricalRate();
    return price;
};

Rate.prototype.date = function () {
    let date = this.getHistoricalDate();
    return date;
};


Rate.prototype.grapf = function () {
    var ctx = document.getElementById("myChart").getContext('2d');
    //var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.date(),
            datasets: [{
                label: '# of Votes',
                data: this.prices(),
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
                        min: this.minGrapfValue(),
                        max: this.maxGrapfValue(),
                        stepSize: 200
                    }
                }]
            }
        }
    });
};

Rate.prototype.minGrapfValue = function () {
    let price = this.prices();
    let res = Math.min.apply(null, price);
    res = Math.floor(res / 100) * 100 - 300;
    return res;
};

Rate.prototype.maxGrapfValue = function () {
    let price = this.prices();
    let res = Math.max.apply(null, price);
    res = Math.floor(res / 100) * 100 + 300;
    return res;
};


let bitcoinRate = new Rate();