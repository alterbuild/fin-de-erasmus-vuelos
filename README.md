# Fin de Erasmus: vuelos a Atenas, Praga, Marrakech y Budapest

Comparador interactivo de vuelos directos desde Lille y Charleroi entre el 9 y el 18 de diciembre de 2026.

- Elige tus días tocando la ida y la vuelta en la cinta de fechas.
- Filtra por origen, duración y número de personas, y decide si sumas el autobús Lille a Charleroi.
- Cada destino muestra su mejor billete, otras fechas y un enlace a Google Flights.

Es un sitio estático sin dependencias: HTML, CSS y JavaScript. Abre `index.html` o sírvelo con cualquier servidor.

```bash
python3 -m http.server 8765
```

## Cómo actualizar los precios

Todos los datos están en `data.js`. Cada línea `add(destino, origen, aerolínea, ida, vuelta, precio, salida, llegada)` es un vuelo de ida y vuelta por persona.

## De dónde salen los datos

- Precios de Google Flights consultados el 27 de octubre de 2026, para 1 adulto, ida y vuelta y solo vuelos directos. Cambian a diario.
- No incluyen maleta de bodega ni mochila grande.
- El autobús Lille a Charleroi se estima en 45 € por persona, ida y vuelta (FlixBus o Flibco).
- Las temperaturas son medias habituales de diciembre, no una previsión.
- Budapest del 14 al 18 de diciembre no se pudo consultar.
- Con 10 personas, easyJet gestiona la reserva como grupo y el precio puede subir.
