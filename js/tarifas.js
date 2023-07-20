// JavaScript para tarifas.html

// Variable para almacenar el botón del mes previamente abierto
let mesAnterior;

// Función para mostrar la información del mes correspondiente al hacer clic en el botón
function mostrarInformacion(mes) {
    var precioContainer = document.getElementById("precioContainer");
    var descripcionMes = document.getElementById("descripcionMes");
    var precioInfo = document.getElementById("precioInfo");

    // Si el mes previo es diferente al mes actual, limpiar el contenido anterior
    if (mesAnterior !== mes) {
        precioInfo.innerHTML = "";

        // Aquí puedes agregar la lógica para obtener y mostrar los precios del mes seleccionado
        // Por ahora, solo mostramos un mensaje de ejemplo
        precioInfo.innerHTML = "Información de precios para " + mes;

        // Aquí puedes agregar la lógica para obtener y mostrar la descripción del mes seleccionado
        // Por ahora, solo mostramos un mensaje de ejemplo
        switch (mes) {
            case "agosto":
                descripcionMes.textContent = "Descripción de Agosto: Aquí va la descripción de agosto.";
                break;
            case "septiembre":
                descripcionMes.textContent = "Descripción de Septiembre: Aquí va la descripción de septiembre.";
                break;
            // Agregar los casos para los demás meses aquí
            default:
                descripcionMes.textContent = "Descripción de Mes no especificado.";
        }

        // Mostrar el contenedor de precios
        precioContainer.style.display = "block";
    }

    // Guardar el mes actual como el mes anterior
    mesAnterior = mes;
}

// Función para cerrar la información del mes al hacer clic en el botón "Cerrar Pregunta"
function cerrarInformacion() {
    var precioContainer = document.getElementById("precioContainer");
    precioContainer.style.display = "none";
}

// Función para cerrar la respuesta al hacer clic en el botón "Cerrar Pregunta"
function cerrarRespuesta() {
    var precioContainer = document.getElementById("precioContainer");
    precioContainer.style.display = "none";
}

// Ocultar el contenedor de precios al cargar la página
window.onload = function () {
    var precioContainer = document.getElementById("precioContainer");
    precioContainer.style.display = "none";
};
