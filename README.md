# Fin de Erasmus: comparador de vuelos

Comparador interactivo de vuelos directos desde Lille y Charleroi a Atenas, Praga, Marrakech, Essaouira, Tánger y Budapest, entre el 10 y el 18 de diciembre de 2026. El miércoles 9 queda fuera porque ya no se puede viajar ese día.

- Elige tus días tocando la ida y la vuelta en la cinta de fechas.
- Filtra por origen, duración, número de personas y ritmo de gasto, y decide si sumas el autobús Lille a Charleroi. Los filtros están en un desplegable que, cerrado, resume en etiquetas lo que has elegido.
- El aviso de la reserva de grupo (con 10 personas) es otro desplegable, cerrado de partida.
- Cada destino muestra su mejor billete, otras fechas, el coste estimado del viaje completo con su desglose y botones para comprar.
- El gráfico de barras compara el viaje completo o solo el vuelo.
- La cabecera tiene seis puertas arqueadas con una foto de cada destino (en escritorio se abren al pasar el ratón y llevan al cartel), y cada cartel abre con su foto.

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

Para cambiar una foto, sustituye los dos archivos y actualiza su entrada en `photos`. `pos` es el punto de enfoque del recorte.

## Botones de compra

Los botones abren la web de la aerolínea con la ruta, las fechas y el número de personas ya puestos:

- easyJet: `https://www.easyjet.com/deeplink?...` (comprobado).
- Ryanair: `https://www.ryanair.com/es/es/trip/flights/select?...` (comprobado, también con 10 pasajeros).
- Wizz Air: `https://www.wizzair.com/es-es/booking/select-flight/...` (la web reconoce el formato, pero en la prueba no llegó a mostrar vuelos).

Los enlaces no preseleccionan la hora del vuelo: se elige en la web de la aerolínea. Los formatos no están documentados oficialmente y pueden cambiar.

## De dónde salen los datos

- Precios de Google Flights consultados el 27 de octubre de 2026, para 1 adulto, ida y vuelta y solo vuelos directos. Cambian a diario.
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
