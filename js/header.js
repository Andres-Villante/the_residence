// Obtén el elemento del header
var header = document.querySelector('header');

// Variable para almacenar la altura en la que el header se vuelve visible
var headerVisibleHeight = 200;

// Variable para almacenar la posición actual del scroll
var previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

// Función para verificar si el header es visible en la ventana
function isHeaderVisible() {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    return scrollPosition >= headerVisibleHeight;
}

// Función para actualizar la visibilidad y posición del header con animación
function updateHeaderVisibility() {
    var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollPosition > previousScrollPosition) {
        // El usuario está desplazándose hacia abajo
        if (!isHeaderVisible()) {
            // El header ya no es visible
            header.classList.add('hidden');
        } else {
            // El header es visible
            header.classList.remove('hidden');
        }
    } else {
        // El usuario está desplazándose hacia arriba
        header.classList.remove('hidden');
    }

    if (isHeaderVisible()) {
        header.classList.add('fixed'); // Aplica la clase 'fixed' para tener una posición fija
    } else {
        header.classList.remove('fixed'); // Quita la clase 'fixed' para volver a la posición normal
    }

    previousScrollPosition = currentScrollPosition;
}

// Actualizar la visibilidad del header al cargar la página
updateHeaderVisibility();

// Escuchar el evento de desplazamiento de la ventana
window.addEventListener('scroll', function () {
    updateHeaderVisibility();
});
