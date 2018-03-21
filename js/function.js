"use strict"

function calcProcent(current, currentYesterday) {
    let resPercent = (current - currentYesterday) / current * 100;
    resPercent = resPercent.toFixed(2);

    let resDigit = current - currentYesterday;

    console.log("resDigit - " + "  " + resDigit);

    resDigit = resDigit.toFixed(2);

    console.log("resDigit - " + "  " + resDigit);

    if (resPercent > 0) {
        $("#changeRate").css("backgroundColor", "SpringGreen");
        $("#changePercent").html(`+ ${resPercent}%`);
        $("#changeDigit").html(`+$${resDigit}`);
    } else {
        $("#changeRate").css("backgroundColor", "red");
        $("#changePercent").html(`${resPercent}%`);
        $("#changeDigit").html(`$${resDigit}`);
    }
};


$("#inputCalc").on("keyup", function () {
    let value = parseFloat($(this).val());
    let currentPrice = bitcoinRate.getCurrentRate();
    if (isNaN(value)) {
        return;
    } else {
        let res = currentPrice * value;

        console.log(res);

        res = res.toFixed(2);

        console.log("toFixed" + "  " + res);

        $("#resCalc").html(res);
    }

});

$("#grapfBtn").on("click", function () {

    $("#showGrapf").show(1000);
    setTimeout(function () {
        bitcoinRate.grapf();

    }, 1500);
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

        let selectedDate = $("#start").datepicker("getDate");
        selectedDate = $.datepicker.formatDate("yy-mm-dd", selectedDate);
        bitcoinRate.setStartDate(selectedDate);

        getHistoricalRate();

        setTimeout(function () {

            bitcoinRate.removeData(myChart);

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
        let selectedDate = $("#end").datepicker("getDate");
        selectedDate = $.datepicker.formatDate("yy-mm-dd", selectedDate);
        bitcoinRate.setEndDate(selectedDate);

        getHistoricalRate();

        setTimeout(function () {

            bitcoinRate.removeData(myChart);

        }, 2000);

        let res = bitcoinRate.getEndDate();
        console.log("bitcoin End: " + res);

        let ripple = rippleRate.getEndDate();
        console.log("Ripple END: " + ripple);

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

}