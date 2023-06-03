document.addEventListener('DOMContentLoaded', function () {
    var fechaIngresoInput = document.getElementById('fecha_ingreso');
    var fechaSalidaInput = document.getElementById('fecha_salida');
    var calcularButton = document.getElementById('cotizar');
    var resultadoDiv = document.getElementById('resultado');

    // Obtener la fecha actual
    var fechaActual = new Date();
    var fechaActualFormateada = fechaActual.toISOString().split('T')[0]; // Formatear la fecha a 'AAAA-MM-DD'

    // Establecer la fecha actual como el valor mínimo para el input de fecha de ingreso
    fechaIngresoInput.min = fechaActualFormateada;

    // Establecer la fecha actual como el valor mínimo para el input de fecha de salida
    fechaSalidaInput.min = fechaActualFormateada;

    function cotizacion() {
        var fechaIngreso = new Date(fechaIngresoInput.value + 'T00:00:00'); // Añadir la hora a las fechas
        var fechaSalida = new Date(fechaSalidaInput.value + 'T00:00:00'); // Añadir la hora a las fechas
        var cantidadPersonas = parseInt(document.getElementById('opciones').value);

        // Validar que la fecha de salida sea posterior a la fecha de ingreso
        if (fechaSalida < fechaIngreso) {
            alert('La fecha de salida no puede ser anterior a la fecha de ingreso');
            return;
        }

        // Validar que la fecha de ingreso sea posterior a la fecha de salida
        if (fechaIngreso > fechaSalida) {
            alert('La fecha de ingreso no puede ser posterior a la fecha de salida');
            return;
        }

        var precioTotal = 0;
        var departamento;

        // Definir los rangos de fechas y sus respectivos precios por noche
        var rangosPrecios = [
            {
                inicio: new Date('2023-06-01'),
                fin: new Date('2023-07-13'),
                precios: [
                    { ambientes: 2, personas: [1, 2, 3, 4], precio: 100 },
                    { ambientes: 3, personas: [5, 6], precio: 200 },
                    { ambientes: 4, personas: [7, 8, 9, 10], precio: 300 }
                ]
            },
            {
                inicio: new Date('2023-07-14'),
                fin: new Date('2023-07-30'),
                precios: [
                    { ambientes: 2, personas: [1, 2, 3, 4], precio: 400 },
                    { ambientes: 3, personas: [5, 6], precio: 500 },
                    { ambientes: 4, personas: [7, 8, 9, 10], precio: 600 }
                ]
            },
            // Agrega los demás rangos de fechas y precios aquí...
            {
                inicio: new Date('2023-07-31'),
                fin: new Date('2023-10-10'),
                precios: [
                    { ambientes: 2, personas: [1, 2, 3, 4], precio: 700 },
                    { ambientes: 3, personas: [5, 6], precio: 800 },
                    { ambientes: 4, personas: [7, 8, 9, 10], precio: 900 }
                ]
            },
            {
                inicio: new Date('2023-10-11'),
                fin: new Date('2023-10-16'),
                precios: [
                    { ambientes: 2, personas: [1, 2, 3, 4], precio: 1000 },
                    { ambientes: 3, personas: [5, 6], precio: 1100 },
                    { ambientes: 4, personas: [7, 8, 9, 10], precio: 1200 }
                ]
            },
            {
                inicio: new Date('2023-10-17'),
                fin: new Date('2023-11-16'),
                precios: [
                    { ambientes: 2, personas: [1, 2, 3, 4], precio: 1300 },
                    { ambientes: 3, personas: [5, 6], precio: 1400 },
                    { ambientes: 4, personas: [7, 8, 9, 10], precio: 1500 }
                ]
            },
            {
                inicio: new Date('2023-11-17'),
                fin: new Date('2023-11-21'),
                precios: [
                    { ambientes: 2, personas: [1, 2, 3, 4], precio: 1600 },
                    { ambientes: 3, personas: [5, 6], precio: 1700 },
                    { ambientes: 4, personas: [7, 8, 9, 10], precio: 1800 }
                ]
            },
            {
                inicio: new Date('2023-11-22'),
                fin: new Date('2023-12-06'),
                precios: [
                    { ambientes: 2, personas: [1, 2, 3, 4], precio: 1900 },
                    { ambientes: 3, personas: [5, 6], precio: 2000 },
                    { ambientes: 4, personas: [7, 8, 9, 10], precio: 2100 }
                ]
            }
        ];


        // Calcular la cantidad de días de diferencia entre las fechas de ingreso y salida
        var diasDiferencia = Math.ceil((fechaSalida - fechaIngreso) / (1000 * 60 * 60 * 24));

        // Encontrar los rangos de precios correspondientes
        var rangosSuperpuestos = rangosPrecios.filter(function (rango) {
            return fechaIngreso <= rango.fin && fechaSalida >= rango.inicio;
        });


        rangosSuperpuestos.forEach(function (rango) {
            var precios = rango.precios.filter(function (precio) {
                return precio.personas.includes(cantidadPersonas);
            });

            if (precios.length > 0) {
                var precioPorNoche = precios[0].precio;

                if (fechaIngreso >= rango.inicio && fechaSalida <= rango.fin) {
                    // Superposición completa del rango
                    precioTotal += precioPorNoche * diasDiferencia;
                } else {
                    // Superposición parcial del rango
                    var diasRango1 = Math.ceil((rango.fin - fechaIngreso) / (1000 * 60 * 60 * 24)) + 1;
                    var diasRango2 = Math.ceil((fechaSalida - rango.inicio) / (1000 * 60 * 60 * 24)) + 1;

                    // Calcular el precio total sumando los precios por noche de cada intervalo
                    var precioRango1 = precioPorNoche * diasRango1;
                    var precioRango2 = precioPorNoche * diasRango2;
                    precioTotal += precioRango1 + precioRango2;
                }

                departamento = rango.precios[0].ambientes;
            }
        });

        var precio = precioTotal.toFixed(2);


        if (precioTotal === 0) {
            alert('No tenemos precios disponibles para las fechas seleccionadas');
            return;
        }

        var precio = precioTotal.toFixed(2);

        // Almacenar los resultados en el almacenamiento local (localStorage)
        var resultados = {
            fechaIngreso: fechaIngreso.toISOString(),
            fechaSalida: fechaSalida.toISOString(),
            cantidadPersonas: cantidadPersonas,
            departamento: departamento,
            precio: precio,
        };

        localStorage.setItem('resultadosCotizacion', JSON.stringify(resultados));

        // Redireccionar a resultado.html
        window.location.href = '../pages/resultado.html';
    }

    calcularButton.addEventListener('click', cotizacion);
});