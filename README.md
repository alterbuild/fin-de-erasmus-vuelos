# Fin de Erasmus: comparador de vuelos

Comparador interactivo de vuelos directos desde Lille y Charleroi a Atenas, Praga, Marrakech, Essaouira, Tánger, Budapest, Estambul, Viena, Tirana y Zagreb, entre el 10 y el 18 de diciembre de 2026. El miércoles 9 queda fuera porque ya no se puede viajar ese día.

- Elige tus días tocando la ida y la vuelta en la cinta de fechas.
- Filtra por origen, duración, número de personas y ritmo de gasto, y decide si sumas el autobús Lille a Charleroi. Los filtros están en un desplegable que, cerrado, resume en etiquetas lo que has elegido.
- El aviso de la reserva de grupo (con 10 personas) es otro desplegable, cerrado de partida.
- Cada destino muestra su mejor billete, otras fechas, el coste estimado del viaje completo con su desglose y botones para comprar.
- El gráfico de barras compara el viaje completo o solo el vuelo.
- La cabecera tiene diez puertas arqueadas con una foto de cada destino (en escritorio se abren al pasar el ratón y llevan al cartel), y cada cartel abre con su foto.

Es un sitio estático sin dependencias: HTML, CSS y JavaScript. Abre `index.html` o sírvelo con cualquier servidor.

```bash
python3 -m http.server 8765
```

## Cómo actualizar los datos

Todo está en `data.js`:

- `add(destino, origen, aerolínea, ida, vuelta, precio, salida, llegada)`: cada línea es un vuelo de ida y vuelta, por persona.
- `cost` de cada destino: alojamiento, comida, transporte local, traslado al aeropuerto y entradas, por persona.

## Fotos

Las fotos son de Wikimedia Commons con licencia libre y están en `img/`: `<destino>.jpg` para los carteles y `<destino>-sm.jpg`, más ligera, para la cabecera en móvil. Están recortadas y reducidas. El autor, la licencia y el enlace de cada una están en `photos` de `data.js`, y la web los muestra en cada foto y en la lista de créditos del final.

| Destino | Autor | Licencia |
|---|---|---|
| Atenas | A.Savin | CC BY-SA 3.0 |
| Praga | Scotch Mist | CC BY-SA 4.0 |
| Marrakech | Herokk | CC BY-SA 4.0 |
| Essaouira | Mustang Joe | CC0 |
| Tánger | Diego Delso | CC BY-SA 4.0 |
| Budapest | Wilfredor | CC0 |
| Estambul | Benh Lieu Song | CC BY-SA 3.0 |
| Viena | Diego Delso | CC BY-SA 4.0 |
| Tirana | Pudelek | CC BY-SA 4.0 |
| Zagreb | Larisa Uhryn | CC BY-SA 4.0 |

Para cambiar una foto, sustituye los dos archivos y actualiza su entrada en `photos`. `pos` es el punto de enfoque del recorte.

## Botones de compra

Los botones abren la web de la aerolínea con la ruta, las fechas y el número de personas ya puestos:

- easyJet: `https://www.easyjet.com/deeplink?...` (comprobado).
- Ryanair: `https://www.ryanair.com/es/es/trip/flights/select?...` (comprobado, también con 10 pasajeros).
- Pegasus: `https://web.flypgs.com/flexible-search?...` (comprobado: abre el calendario de precios con la ruta, las fechas y los pasajeros ya marcados; el formato `/booking?...` no mostró vuelos).
- Wizz Air: `https://www.wizzair.com/es-es/booking/select-flight/...` (la web reconoce el formato, pero en la prueba no llegó a mostrar vuelos).

Los enlaces no preseleccionan la hora del vuelo: se elige en la web de la aerolínea. Los formatos no están documentados oficialmente y pueden cambiar.

## De dónde salen los datos

- Precios de Google Flights consultados el 27 de octubre de 2026 (Estambul, Viena, Tirana y Zagreb, el 28), para 1 adulto, ida y vuelta y solo vuelos directos. Cambian a diario.
- No incluyen maleta de bodega ni mochila grande.
- El autobús Lille a Charleroi se estima en 45 € por persona, ida y vuelta (FlixBus o Flibco).
- Alojamiento: apartamentos de Airbnb y Booking para 10 personas con 10 camas o más, para las fechas del viaje. En Praga se confirmaron camas individuales; en el resto, hay que revisar el tipo de cama.
- Comida: precios de Numbeo (restaurante económico, cena de gama media, café y cerveza), sin recargo turístico. El ritmo "ajustado", que es el de partida, es desayuno en el apartamento, menú del día (el 70 % de una comida económica) y cena económica; el "normal", dos cafés, una comida económica, una cena de gama media y una cerveza.
- Entradas, con descuento de estudiante: Acrópolis 15 € (gratis para menores de 25 de la UE), Castillo de Praga unos 9 € (hasta un 50 % menos para estudiantes de 17 a 26 años), Jardín Majorelle unos 9 €, baños Lukács entre semana unos 18 €, más 5 € de otra visita. En Essaouira y Tánger son unos 8 € en total (estimación). Hay que llevar el carné de estudiante.
- Traslados: metro de Atenas (16 € ida y vuelta), autobús 119 y metro en Praga, autobús 100E en Budapest.
- No incluye tasas turísticas (de 1 a 3 € por persona y noche), compras, fiesta ni seguro de viaje.
- Las temperaturas son medias habituales de diciembre, no una previsión.
- Mezclar aeropuertos (ida desde Lille y vuelta a Charleroi, o al revés) no sale más barato. En Marrakech, la mejor mezcla de 4 noches (ida desde Charleroi el 13 y vuelta a Lille el 17) cuesta unos 125 € con medio autobús, frente a unos 120 € por Charleroi. Los precios por tramo salen de la web de Ryanair (Charleroi) y de Google Flights (easyJet).
- Alojamiento en Marrakech: riads para 10 con 10 camas o más desde unos 19 € por persona y noche (La Casa Koutoubia y Riad Nolya, a unos 760 y 780 € las 4 noches) hasta unos 33 €.
- Con 10 personas, easyJet gestiona la reserva como grupo. Al comprobarlo, Praga salía a 55,29 € por persona en lugar de 54,94 €.
- Essaouira y Tánger salen solo de Charleroi (Ryanair). Su alojamiento sale de Booking (por ejemplo, Résidence Louzani en Essaouira, con 10 camas individuales, a unos 660 € las 4 noches) y es el menos verificado: revisa el tipo de cama.
- Estambul: solo hay vuelo directo desde Charleroi, con Pegasus a Sabiha Gökçen (no hay desde Lille). El billete de vuelta cuesta unos 57 € cualquier día (calendario de Pegasus), así que el precio depende del día de ida: el 10 sale a 128 € ida y vuelta y el 15, a 205 €. El precio de Google Flights y el de Pegasus difieren en 1 € por tramo.
- Alojamiento en Estambul: Sultanahmet Corner Apart (Booking), con 2 apartamentos para 10 con 8 camas individuales y 2 dobles (más 2 sofás cama), a unos 15 min a pie de Santa Sofía y del Gran Bazar según Google Maps; unos 713 € las 4 noches en la ficha del apartamento, es decir, unos 18 € por persona y noche (la búsqueda mostraba 577 €, unos 14 €, con un descuento que pide iniciar sesión). En Airbnb lo más barato con 10 camas salía a unos 18 € por persona y noche (dúplex de 3 dormitorios en Galata, 740 €).
- Entradas en Estambul: no cuento descuento de estudiante. La normativa del Ministerio de Cultura de Turquía solo da descuentos a quien estudia en Turquía y entrada gratis a grupos Erasmus con convenio con una institución turca. Cuento la Cisterna Basílica (unos 27 €, 1.500 liras) y los Museos Arqueológicos (15 €). La planta baja de Santa Sofía, la Mezquita Azul y el Gran Bazar son gratis; la galería de Santa Sofía cuesta 25 €, Topkapı unos 49 € y la Torre de Gálata 30 €.
- Comida y transporte en Estambul: no pude consultar Numbeo (bloquea el acceso); uso guías de 2026 con unas 55 liras por euro. Lokanta de 350 a 650 liras, cena de gama media de 700 a 1.200, unos 42 liras por viaje. Traslado desde Sabiha Gökçen en metro M4 y Marmaray (unos 3 € por trayecto, más la Istanbulkart, unos 3 €); en taxi saldría a 30 o 50 € por coche.
- Clima de Estambul en diciembre: unos 11 grados de día y 5 de noche, con lluvia la mitad de los días.
- Viena, Tirana y Zagreb salen solo de Charleroi: desde Lille no hay directo a ninguna de las tres. Viena y Zagreb son de Ryanair (operado por Lauda Europe) y solo vuelan algunos días; Tirana tiene Ryanair y Wizz Air casi a diario. Los precios por tramo se suman (cada aerolínea cobra ida y vuelta por separado) y coinciden con los de ida y vuelta de Google Flights.
- Viena: mejor combinación, del 12 al 17 por 64 € (5 noches); con 4 noches, solo del 10 al 14 por 142 €. Sale lunes, jueves y sábado.
- Tirana: del 13 al 17 por 40 € con Ryanair (la ida a las 6:30); con Wizz Air, 51 €.
- Zagreb: del 14 al 18 por 56 € y del 10 al 14 por 57 €. Para Croacia solo hay directo a Zagreb: sin vuelos directos a Split, Dubrovnik ni Zadar el 13 y el 17 de diciembre.
- Alojamiento (Booking, 4 noches para 10): Viena, Kienmayer Apartment, 1.177 €, a 4,7 km del centro (6 camas individuales, 3 sofás cama y 2 dobles); Tirana, Tirana Sunny Bliss Villa, 576 €, a 1,6 km (6 individuales, 3 sofás cama y 2 dobles); Zagreb, Pamer Apartments, 1.189 €, a 1,4 km (6 individuales y 6 literas). Lo más barato en Viena (unos 730 €) son apartamentos con camas dobles y a más de 9 km, así que no los usé.
- Comida y transporte: no pude consultar Numbeo; uso guías de 2026. Zagreb: menú de mediodía de 6 a 9 €, billete diario de tranvía 3,98 €, autobús del aeropuerto 8 €. Viena: comida económica de unos 16 a 19 €, billete de 24 horas 10,20 € (ya no hay de 72). Tirana: comida local de hasta 10 €, autobús urbano 0,4 €, autobús del aeropuerto unos 4 €.
- Entradas: Viena, Belvedere con tarifa de estudiante (19 €) y 5 € de otra visita; Tirana, Bunk'Art 1 y 2 con entrada combinada (unos 12 €); Zagreb, Museo de las Relaciones Rotas (7 €). No encontré descuentos de estudiante en Tirana ni en Zagreb.
- Clima en diciembre: Viena 4 y −1 grados; Tirana 13 y 5, con lluvia casi la mitad de los días; Zagreb 5 y −1. Son medias de fuentes secundarias.
