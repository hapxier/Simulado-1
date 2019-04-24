//Diccionario de variables
var DO = 2; //duracion predeterminada de orden ordinaria
var DP = 4; //duracion predeterminada de orden prioritaria
var PU; //porcentaje de utilizacion
var PO = 0.7; //porcentaje de ordenes ordinarias
var PP = 0.3; //porcentaje de ordenes prioritarias
var T; //numero de tecnicos
var H; //Horas de jornadas laborales
var N; //numero de ordenes
var OO; //numero de ordenes ordinarias
var OP; //numero de ordenes prioritarias
var HE; //horas extras/sobrantes
var ME; //cantidad a pagar de horas extras
var TE; //numero de técnicos extra (si porcentaje de utilizacion es mayor a 100)

function cambiarDuracion() {
    document.getElementById("btn-cambiar-dur").disabled = true;
    document.getElementById("btn-guardar-dur").disabled = false;

    document.getElementById("dur_ordinarias").disabled = false;
    document.getElementById("dur_prioritarias").disabled = false;
    document.getElementById("n_ordinarias").disabled = false;
    document.getElementById("n_prioritarias").disabled = false;

    document.getElementById("btn-calcular").disabled = true;
}

function guardarDuracion() {
    DO = document.getElementById("dur_ordinarias").value;
    DP = document.getElementById("dur_prioritarias").value;

    PO = document.getElementById("n_ordinarias").value / 100;
    PP = document.getElementById("n_prioritarias").value / 100;

    document.getElementById("btn-cambiar-dur").disabled = false;
    document.getElementById("btn-guardar-dur").disabled = true;
    document.getElementById("dur_ordinarias").disabled = true;
    document.getElementById("dur_prioritarias").disabled = true;
    document.getElementById("n_ordinarias").disabled = true;
    document.getElementById("n_prioritarias").disabled = true;

    document.getElementById("btn-calcular").disabled = false;
}

//Encontrar el numero de ordenes correspondientes a ordinarias y prioritarias
/*function clasificarOrdenes(){
	document.getElementById("n_ordinarias").innerHTML =
		document.getElementById("n_ordenes").value * 0.7;
	document.getElementById("n_prioritarias").innerHTML =
		document.getElementById("n_ordenes").value * 0.3;
}*/


function calcularUtilizacion() {
    if (validacion()) {
        $('#div').show();

    document.getElementById("btn-calcular").disabled = true;
    document.getElementById("btn-cambiar-dur").disabled = true;

    document.getElementById("n_tecnicos").disabled = true;
    document.getElementById("horas_jornada").disabled = true;
    document.getElementById("n_ordenes").disabled = true;

    T = document.getElementById("n_tecnicos").value;
    H = document.getElementById("horas_jornada").value;
    N = document.getElementById("n_ordenes").value;

    //Calcular numero de ordenes ordinarias y prioritarias
    OO = N * PO;
    console.log("Ordenes ordinarias " + OO);
    document.getElementById('lbl-OO').innerHTML = '<b>' + "N° Órdenes ordinarias: " + '</b>' + Math.floor(OO.toFixed(2));

    OP = N * PP;
    console.log("Ordenes prioritarias " + OP);
    document.getElementById('lbl-OP').innerHTML = '<b>' + "N° Órdenes prioritarias: " + '</b>' + Math.ceil(OP.toFixed(2));

    //Calcular porcentaje de utilización
    PU = (((N * PO * DO) + (N * PP * DP)) / (T * H)) * 100;
    console.log("Porcentaje de utilizacion " + PU);
    document.getElementById('lbl-PU').innerHTML = '<b>' + "Porcentaje de utilización: " + '</b>' + PU.toFixed(2) + '%';

    //Calcular horas extras/sobrantes
    if (PU == 100) {
        HE = 0;
        console.log(HE);
        document.getElementById('lbl-sobrante').innerHTML = '<b>' + "Horas sobrantes: " + '</b>' + "No hay horas extra";
    } else {
        if (PU < 100) {
            HE = ((100 - PU) / 100) * (T * H);
            console.log("Horas sobrantes " + HE);
            document.getElementById('lbl-sobrante').innerHTML = '<b>' + "Horas sobrantes: " + '</b>' + HE.toFixed(2);
        } else {
            HE = ((PU - 100) / 100) * (T * H);
            console.log("Horas extras " + HE);
            document.getElementById('lbl-HE').innerHTML = '<b>' + "Horas extras: " + '</b>' + HE.toFixed(2);
            //Tecnicos extras necesarios
            TE = HE / 8;
            console.log("Tecnicos extras necesarios " + TE);
            document.getElementById('lbl-TE').innerHTML = '<b>' + "Tecnicos extras necesarios: " + '</b>' + Math.ceil(TE);
            //Calcular monto para horas extras
            ME = HE * 50;
            console.log("Billete extra que hay que soltar " + ME);
            document.getElementById('lbl-ME').innerHTML = '<b>' + "Dinero de horas extra: " + '</b>' + ME.toFixed(2);
        }
    }
    }else{
        reiniciar();
    }
}

function reiniciar() {
    location.reload();
    document.getElementById("btn-calcular").disabled = false;
}

$( document ).ready(function() {
    //$(selector).show(opciones);
    $('#div').hide();
});


function validacion() {
    if ($('#n_tecnicos').val().length == 0) {
        alert('Ingrese Número de técnicos');
        return false;
    }
    else if($('#horas_jornada').val().length == 0) {
        alert('Ingrese Horas de jornada');
        return false;
    }
    else if ($('#n_ordenes').val().length == 0) {
        alert('Número de ordenes');
        return false;
    }else{
        return true;
    }

}