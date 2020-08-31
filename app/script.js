// https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0


$(document).ready(function(){


$("#next").click(function(){
    var newDate = moment().add(1,"months");
    var dataT = $("h1").attr("data-this-date", newDate);
    insertDays(dataT);
    insertHolidays(dataT);
    console.log(dataT);

})






// data di partenza
// creaiamo un oggetto moment su data di partenza
var dataCorrente = moment("2018-01-01");
// console.log(dataCorrente);
insertDays(dataCorrente);
insertHolidays(dataCorrente);

// console.log(dataCorrente);
// 2 step - Andare a scrivere il nostro mese e anno in h1






// Fine document
});
// ***********FUNZIONI*********

function insertDays(data){
    // 2 step - Andare a scrivere il nostro mese e anno in h1
    var month = data.format("MMMM");
    var year = data.format("YYYY");
    $("h1.month").html(month+ " "+ year);
    // 3 Step - generare i giorni
    // *****Calcolare il 31 con moment*****
    var daysMonth = data.daysInMonth();
    // console.log(daysMonth);
    for (var i = 1; i <= daysMonth; i++) {
        var source = $("#day-template").html();
        var template = Handlebars.compile(source);

        var context = {
            "day" : addZero(i),
            "month" : month,
            "completeDate" : year + "-" + data.format("MM") + "-" + addZero(i)
        };
        var html = template(context);

    $(".month-list").append(html)


    }


};

function addZero(n){
    if (n<10) {
        return "0"+n

    } return n

};

function insertHolidays(data) {
    $.ajax(
        {
            url:'https://flynn.boolean.careers/exercises/api/holidays',
            method:'GET',
            data: {
                year:data.year(),
                month:data.month()
            },
            success: function(risposta){
                // console.log(risposta.response);
                for (var i = 0; i < risposta.response.length; i++) {
                    var listItem = $('li[data-complete-date="'+ risposta.response[i].date + '"]');
                    listItem.append("-" + risposta.response[i].name);
                    listItem.addClass("holiday")
                }

            },
            error: function(){
                alert("errore")
            }
        }
    );
}
