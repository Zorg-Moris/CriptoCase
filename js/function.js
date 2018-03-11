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

        console.log(selectedDate);

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
      
        console.log(selectedDate);

    }
});



// function grapf() {
//     var ctx = document.getElementById("myChart").getContext('2d');
//     //var ctx = $("#myChart");
//     var myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: this.date(),
//             datasets: [{
//                 label: '# of Votes',
//                 data: this.prices(),
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 borderColor: 'rgba(255,99,132,1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             tooltips: {
//                 borderColor: 'rgb(233, 150, 122)',
//                 backgroundColor: 'rgb(138, 43, 226)'
//             },

//             animation: {
//                 duration: 3000,
//                 easing: 'easeOutBack' //'easeInOutBack'
//             },

//             scales: {
//                 yAxes: [{

//                     ticks: {
//                         min: minGrapfValue.call(bitcoinRate), //this.minGrapfValue(),
//                         max: maxGrapfValue.call(bitcoinRate), //this.maxGrapfValue(),
//                         stepSize: 200
//                     }
//                 }]
//             }
//         }
//     });
// };

// function minGrapfValue() {
//     let price = this.prices();
//     let res = Math.min.apply(null, price);
//     res = Math.floor(res / 100) * 100 - 300;
//     return res;
// };

// function maxGrapfValue() {
//     let price = this.prices();
//     let res = Math.max.apply(null, price);
//     res = Math.floor(res / 100) * 100 + 300;
//     return res;
// };