"use strict"



$(document).ready(function () {

    getCurrentRate();
    getHistoricalRate();


    let key = 1520640000;
    let myDAte = moment(key).format("MMM Do YY");

    console.log("myDAte:  " + myDAte);


    setTimeout(function () {
        bitcoinRate.grapf();

        //  grapf.call(bitcoinRate);

        $("#start").datepicker("setDate", "-7d");
        let selectedDate = $("#start").datepicker("getDate");

        console.log(selectedDate);


        $("#end").datepicker("setDate", "-1d");

    }, 1500);
});