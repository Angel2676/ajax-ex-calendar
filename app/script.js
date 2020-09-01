//-------API-----/
// Link API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
// *******Descrizione***********
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
// *******Milestone 1********
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// *******Milestone 2********
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
// ********Attenzione!******************
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’API quali sono le festività per il mese scelto
// Evidenziare le festività nella lista.

//********SVOLGIMENTO***********
$(document).ready(function(){

    // var dataDiPartenza = moment("2018-01-01");
    var dataDiPartenza = moment($('h1#mese').attr('data-partenza')); // MEMORIZZO l'attributo data-partenza del tag h1 e lo considero come data di partenza per generare le date

    inserisciDate(dataDiPartenza);

    inserisciFesta(dataDiPartenza);

    $('button#next').click(function(){
        next(dataDiPartenza);
    })

    $('button#prev').click(function(){
        prev(dataDiPartenza);
    })

});

// --- funzioni --- //

function addZero(n){
    if (n < 10){
        return '0' + n;
    }
    return n;
}

function inserisciDate(data){
    $('ul#calendario').empty();                         // svuoto l'elenco ul prima di riempirlo

    var giorniTotali = data.daysInMonth();              // calcolo i giorni totali in un mese

    var meseParola = data.format('MMMM');       // memorizzo in una variabile il nome del mese
    var anno = data.year();                     // memorizzo in una variabile l'anno

    $('h1#mese').html(meseParola + ' ' + anno);         // implemento l'h1 con mese e anno

    for (var i = 1; i <= giorniTotali; i++){            // ciclo tutti i giorni del mese
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);

        var context = {
            giorno: addZero(i),
            mese: meseParola,
            dataCompleta: anno + '-' + data.format('MM') + '-' + addZero(i)
        };
        var html = template(context);

        $('#calendario').append(html);
    }
}

function inserisciFesta(data){
    $.ajax(
        {
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method:'GET',
            data:{
                year: data.year(),
                month: data.month()
            },
            success: function(risposta){
                for (var i = 0; i < risposta.response.length; i++){
                    var elemento = $('li[data-completa="' + risposta.response[i].date + '"]');
                    elemento.addClass("festa");
                    elemento.append(' - ' + risposta.response[i].name);
                    console.log(elemento);
                }

            },
            error: function(){
                alert('Si è verificato un errore');
            }
        }
    );
}

function next(data){
    if (data.month() == 11){
        alert('Non puoi proseguire');
    } else {
        data.add(1, 'months');
        inserisciDate(data);
        inserisciFesta(data);
    }
}

function prev(data){
    if (data.month() == 0){
        alert('Non puoi proseguire');
    } else {
        data.subtract(1, 'months');
        inserisciDate(data);
        inserisciFesta(data);
    }
}
