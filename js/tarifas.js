let mesAnterior;

function mostrarInformacion(mes) {
    var precioContainer = document.getElementById("precioContainer");
    var descripcionMes = document.getElementById("descripcionMes");
    var precioInfo = document.getElementById("precioInfo");

    if (mesAnterior !== mes) {
        precioInfo.innerHTML = "";

        switch (mes) {
            case "agosto":
            case "septiembre":
                descripcionMes.innerHTML = "<h3>Información de precios para agosto y septiembre</h3>" +
                    "<p>Tarifas por noche (mínimo 2 noches):</p>" +
                    "<p>Plan Parejas (depto. 2 amb.): $20.000</p>" +
                    "<p>Departamento 2 ambientes: $25.000</p>" +
                    "<p>Departamento 3 ambientes: $30.000</p>" +
                    "<p>Departamento 4 ambientes: $35.000</p>";
                break;

            case "octubre":
            case "noviembre":
                descripcionMes.innerHTML = "<h3>Información de precios para octubre y noviembre</h3>" +
                    "<p>Tarifas por noche (mínimo 2 noches):</p>" +
                    "<p>Plan Parejas (depto. 2 amb.): $25.000</p>" +
                    "<p>Departamento 2 ambientes: $30.000</p>" +
                    "<p>Departamento 3 ambientes: $35.000</p>" +
                    "<p>Departamento 4 ambientes: $40.000</p>";
                break;

            case "noviembre":
                descripcionMes.textContent = "Descripción de Noviembre: Aquí va la descripción de noviembre.";
                break;

            case "diciembre":
                descripcionMes.textContent = "Las tarifas para ALTA TEMPORADA estarán disponibles a partir del mes de septiembre con nuestro acostumbrado plan de cuotas.";
                break;

            case "enero":
                descripcionMes.textContent = "Las tarifas para ALTA TEMPORADA estarán disponibles a partir del mes de septiembre con nuestro acostumbrado plan de cuotas.";
                break;

            case "febrero":
                descripcionMes.textContent = "Las tarifas para ALTA TEMPORADA estarán disponibles a partir del mes de septiembre.";
                break;

            case "marzo":
                descripcionMes.textContent = "Las tarifas para ALTA TEMPORADA estarán disponibles a partir del mes de septiembre con nuestro acostumbrado plan de cuotas.";
                break;

            default:
                descripcionMes.textContent = "Descripción de Mes no especificado.";
        }

        precioContainer.style.display = "block";
    }

    mesAnterior = mes;
}

function cerrarInformacion() {
    var precioContainer = document.getElementById("precioContainer");
    precioContainer.style.display = "none";
}

function cerrarRespuesta() {
    var precioContainer = document.getElementById("precioContainer");
    precioContainer.style.display = "none";
}

window.onload = function () {
    var precioContainer = document.getElementById("precioContainer");
    precioContainer.style.display = "none";
};
