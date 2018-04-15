"use strict"

function calcProcent(current, currentYesterday) {
    let resPercent = (current - currentYesterday) / current * 100;
    resPercent = resPercent.toFixed(2);

    let resDigit = current - currentYesterday;

    resDigit = resDigit.toFixed(2);

    if (resPercent > 0) {
        $("#changeRate").css("backgroundColor", "SpringGreen");
    } else {
        $("#changeRate").css("backgroundColor", "red");
    }

    $("#changePercent").html(`${resPercent}%`);
    $("#changeDigit").html(`$${resDigit}`);
};


$("#inputCalc").on("keyup", function () {

    if ($(this).hasClass("alarm-input")) {
        $(this).removeClass("alarm-input");
    }

    let value = parseFloat($(this).val());
    let currentPrice = bitcoinRate.getCurrentRate();
    if (isNaN(value)) {
        $(this).addClass("alarm-input");
        return;
    } else {
        let res = currentPrice * value;
        res = res.toFixed(2);
        $("#resCalc").html(res);
    }

});

$("#grapfBtn").on("click", function () {
    if ($("#showGrapf").hasClass("invisibleGrapf")) {
        $("#showGrapf").toggleClass("invisibleGrapf visibleGrapf");

        setTimeout(function () {
            bitcoinRate.grapf();
        }, 1500);
    } else {
        $("#showGrapf").toggleClass("visibleGrapf invisibleGrapf ");
        destroyData(myChart);
    }
});


$("#start").datepicker({
    selectOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    yearRange: "2009:2025",
    dateFormat: "dd MM,yy",
    showOtherMonths: true,
    showAnim: "slide",
    duration: "slow",
    maxDate: "-3d",

    onSelect: function (date, datepicker) {

        if ($("#date input").hasClass("alarm-input")) {
            $("#date input").removeClass("alarm-input");
        }
        let selectedDate = $("#start").datepicker("getDate");
        selectedDate = $.datepicker.formatDate("yy-mm-dd", selectedDate);
        bitcoinRate.setStartDate(selectedDate);

        getHistoricalRate();

        setTimeout(function () {

            removeData(myChart);

        }, 2000);

    }
});


$("#end").datepicker({
    selectOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    yearRange: "2009:2025",
    dateFormat: "dd MM,yy",
    showOtherMonths: true,
    showAnim: "slide",
    duration: "slow",
    maxDate: "0d",

    onSelect: function (date, datepicker) {

        if ($("#date input").hasClass("alarm-input")) {
            $("#date input").removeClass("alarm-input");
        }

        let selectedDate = $("#end").datepicker("getDate");
        selectedDate = $.datepicker.formatDate("yy-mm-dd", selectedDate);
        bitcoinRate.setEndDate(selectedDate);

        getHistoricalRate();

        setTimeout(function () {

            removeData(myChart);

        }, 2000);
    }
});

function defaultDate() {

    $("#start").datepicker("setDate", "-7d");
    $("#end").datepicker("setDate", "-1d");

    let startDate = $("#start").datepicker("getDate");
    startDate = $.datepicker.formatDate("yy-mm-dd", startDate);
    bitcoinRate.setStartDate(startDate);

    let endDate = $("#end").datepicker("getDate");
    endDate = $.datepicker.formatDate("yy-mm-dd", endDate);
    bitcoinRate.setEndDate(endDate);

    getHistoricalRate();

};

function removeData(chart) {
    chart.update({
        duration: 5000,
        easing: "easeOutBounce"
    });
};

function destroyData(chart) {
    chart.destroy();
};


async function main() {

    let currentPrice = await getCurrentRate();
    let yesterdayPrice = await getCurrentRateYesterday();

    calcProcent(currentPrice, yesterdayPrice);

    defaultDate();
};


async function intervalMain() {

    let currentPrice = await getCurrentRate();
    let yesterdayPrice = await getCurrentRateYesterday();

    calcProcent(currentPrice, yesterdayPrice);

};