const precios = {
    enero: {
        mensaje: "Consultar precios por WhatsApp."
    },
    febrero: {
        mensaje: "Consultar precios por WhatsApp."
    },
    marzo: {
        mensaje: "Consultar precios por WhatsApp."
    }
};

function mostrarInformacion(mes) {
    var precioContainer = document.getElementById("precioContainer");
    var descripcionMes = document.getElementById("descripcionMes");
    var precioInfo = document.getElementById("precioInfo");

    precioContainer.style.display = "block";
    window.location.href = `resultado.html?mes=${mes}&precios=${JSON.stringify(precios[mes])}`;
}
