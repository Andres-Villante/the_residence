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

        var departamento;
        var precio;

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
            }
        ];

        // Calcular la cantidad de días de diferencia entre las fechas de ingreso y salida
        var diasDiferencia = Math.ceil((fechaSalida - fechaIngreso) / (1000 * 60 * 60 * 24));

        // Encontrar el rango de precios correspondiente
        var rangosSuperpuestos = rangosPrecios.filter(function (rango) {
            return fechaIngreso <= rango.fin && fechaSalida >= rango.inicio;
        });

        // Tomar los precios del segundo intervalo
        var segundoIntervalo = rangosSuperpuestos[1];
        if (segundoIntervalo && segundoIntervalo.precios) {
            var preciosSegundoIntervalo = segundoIntervalo.precios.find(function (precio) {
                return precio.personas.includes(cantidadPersonas);
            });

            if (preciosSegundoIntervalo) {
                departamento = preciosSegundoIntervalo.ambientes;
                precio = preciosSegundoIntervalo.precio * diasDiferencia;
            } else {
                alert('No tenemos precios disponibles para la cantidad de personas seleccionadas');
                return;
            }
        } else {
            // Tomar los precios del primer intervalo
            var primerIntervalo = rangosPrecios[0];
            if (primerIntervalo && primerIntervalo.precios) {
                var preciosPrimerIntervalo = primerIntervalo.precios.find(function (precio) {
                    return precio.personas.includes(cantidadPersonas);
                });

                if (preciosPrimerIntervalo) {
                    departamento = preciosPrimerIntervalo.ambientes;
                    precio = preciosPrimerIntervalo.precio * diasDiferencia;
                } else {
                    alert('No tenemos precios disponibles para la cantidad de personas seleccionadas');
                    return;
                }
            } else {
                alert('No tenemos precios disponibles para las fechas seleccionadas');
                return;
            }
        }

        // Almacenar los resultados en el almacenamiento local (localStorage)
        var resultados = {
            fechaIngreso: fechaIngreso.toISOString(),
            fechaSalida: fechaSalida.toISOString(),
            cantidadPersonas: cantidadPersonas,
            departamento: departamento,
            precio: precio
        };

        localStorage.setItem('resultadosCotizacion', JSON.stringify(resultados));

        // Redireccionar a resultado.html
        window.location.href = '../pages/resultado.html';
    }

    calcularButton.addEventListener('click', cotizacion);
});
