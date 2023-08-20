const precios = {
    agosto: {
        parejas: "$20.000",
        departamento2: "$25.000",
        departamento3: "$30.000",
        departamento4: "$35.000",
    },
    septiembre: {
        parejas: "$25.000",
        departamento2: "$30.000",
        departamento3: "$35.000",
        departamento4: "$40.000",
    },
    octubre: {
        parejas: "$30.000",
        departamento2: "$35.000",
        departamento3: "$40.000",
        departamento4: "$45.000",
    },
    noviembre: {
        parejas: "$30.000",
        departamento2: "$35.000",
        departamento3: "$40.000",
        departamento4: "$45.000",
    },
    diciembre: {
        parejas: "$35.000",
        departamento2: "$45.000",
        departamento3: "$55.000",
        departamento4: "$60.000",
    },
    enero: {
        mensaje: "Las tarifas para alta temporada estarán disponibles a partir del mes de septiembre, con planes de cuotas para que tus vacaciones resulten mas accesibles."
    },
    febrero: {
        mensaje: "Las tarifas para alta temporada estarán disponibles a partir del mes de septiembre, con planes de cuotas para que tus vacaciones resulten mas accesibles."
    },
    marzo: {
        mensaje: "Las tarifas para alta temporada estarán disponibles a partir del mes de septiembre, con planes de cuotas para que tus vacaciones resulten mas accesibles."
    }
};

function mostrarInformacion(mes) {
    var precioContainer = document.getElementById("precioContainer");
    var descripcionMes = document.getElementById("descripcionMes");
    var precioInfo = document.getElementById("precioInfo");

    precioContainer.style.display = "block";
    window.location.href = `resultado.html?mes=${mes}&precios=${JSON.stringify(precios[mes])}`;
}
