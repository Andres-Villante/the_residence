function toggleRespuesta(elemento) {
    var respuesta = elemento.nextElementSibling;

    respuesta.classList.toggle('visible');
}

function cerrarRespuesta(elemento) {
    var respuesta = elemento.parentNode;
    respuesta.classList.remove('visible');
}