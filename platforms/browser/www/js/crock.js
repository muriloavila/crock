function getLastPoint(){
    var now = new Date();
    var date = new Date(Date.now()).toISOString().split('T')[0];

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var myUrl = 'http://18.191.54.140/ponto/DAY/'+date;
    var finalURL = proxy + myUrl;

    $.ajax({
        url: finalURL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        dataType: "json",
        success: function (result) {
            if($.isEmptyObject(result)){
                setNextPoint(null);
            }else{
                setNextPoint(result[0].tipo);
            }
        }
    });
}


function setNextPoint(tipo) {
    if(tipo == null){
        tipo = "SAIDA";
    }
    var next = "";
    var idTipo = 0;
    
    switch(tipo){
        case 'ENTRADA':case "1":
            next = "Almoço Entrada";
            idTipo = 2;
        break;

        case 'ALMOÇO_IN':case "2":
            next = "Almoço Volta";
            idTipo = 3;
        break;

        case 'ALMOÇO_OUT':case "3":
            next = "Saida";
            idTipo = 4;
        break;

        case 'SAIDA':case "4":
            next = "Entrada";
            idTipo = 1;
        break;

    }

    $("#ponto").html(next).attr('tipo', idTipo);
}

function salvaPonto(){
    var tipo = $("#ponto").attr('tipo');
    var currentdate = new Date();

    month = currentdate.getMonth()+1 < 10 ? "0" + (currentdate.getMonth()+1) : currentdate.getMonth()+1;

    day = currentdate.getDate() < 10 ? "0" + currentdate.getDate() : currentdate.getDate();
    var datetime = currentdate.getFullYear() + "-"
                + month + "-" 
                + day + "%20"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    
    
    var myUrl = 'http://18.191.54.140/ponto/'+datetime+'/type/'+tipo;
    
    $.ajax({
        url: myUrl,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        type: "POST",
        dataType: "json",
        success: function (result) {
            if(result.response){
                setNextPoint(tipo);
            }else{
                console.log(result);
            }
        }
    });
}