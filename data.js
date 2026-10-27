/*
  Datos de la comparativa. Para actualizar precios, edita solo este archivo.
  Precios: Google Flights, 27 de octubre de 2026, 1 adulto, ida y vuelta,
  solo vuelos directos, sin maleta de bodega.
*/
window.TRIP = {
  checked: "27 de octubre de 2026",
  bus: 45, // autobús Lille–Charleroi, ida y vuelta, por persona (estimación)
  days: [
    { n: 10, w: "jue", long: "jueves" },
    { n: 11, w: "vie", long: "viernes" },
    { n: 12, w: "sáb", long: "sábado" },
    { n: 13, w: "dom", long: "domingo" },
    { n: 14, w: "lun", long: "lunes" },
    { n: 15, w: "mar", long: "martes" },
    { n: 16, w: "mié", long: "miércoles" },
    { n: 17, w: "jue", long: "jueves" },
    { n: 18, w: "vie", long: "viernes" }
  ],
  origins: { LIL: "Lille", CRL: "Charleroi" },
  /*
    cost, por persona:
      lodging: noche en apartamento para 10 con 10 camas o más.
      food: por día. ajustado = desayuno en el apartamento, menú del día y cena económica.
            normal = dos cafés, comida económica, cena de gama media y una cerveza.
      sights: entradas con descuento de estudiante.
  */
  dest: {
    atenas: {
      name: "Atenas", country: "Grecia", code: "ATH",
      flight: "3 h 10 min", hi: 14, lo: 8, sky: "cloud",
      skyText: "Nubes y algún chubasco",
      vibe: "Acrópolis, Plaka y el Ágora al aire libre, con unos 14 grados.",
      cost: {
        lodging: 32, lodgingRange: [26, 38],
        food: { ajustado: 28, normal: 57 },
        local: 4,
        transfer: 16, transferNote: "Metro del aeropuerto, 16 € ida y vuelta",
        sights: 20, sightsNote: "Acrópolis con descuento de estudiante (15 €; gratis para menores de 25 de la UE) y otra visita (5 €)"
      }
    },
    praga: {
      name: "Praga", country: "Chequia", code: "PRG",
      flight: "1 h 30 min", hi: 3, lo: -1, sky: "snow",
      skyText: "Gris y con posible nieve",
      vibe: "Mercadillos de Navidad, puentes y casco antiguo, con frío de invierno.",
      cost: {
        lodging: 36, lodgingRange: [31, 45],
        food: { ajustado: 18, normal: 40 },
        local: 5,
        transfer: 4, transferNote: "Autobús 119 y metro",
        sights: 14, sightsNote: "Castillo de Praga con descuento de estudiante (unos 9 €) y otra visita (5 €)"
      }
    },
    marrakech: {
      name: "Marrakech", country: "Marruecos", code: "RAK",
      flight: "3 h 30 min", hi: 19, lo: 6, sky: "sun",
      skyText: "Seco y soleado, noches frías",
      vibe: "El único con días soleados y cálidos: zocos, riads y el Atlas a un día.",
      cost: {
        lodging: 25, lodgingRange: [19, 33],
        food: { ajustado: 8, normal: 28 },
        local: 4,
        transfer: 6, transferNote: "Autobús o taxi compartido",
        sights: 14, sightsNote: "Jardín Majorelle con tarifa de estudiante (unos 9 €) y otra visita (5 €)"
      }
    },
    budapest: {
      name: "Budapest", country: "Hungría", code: "BUD",
      flight: "2 h", hi: 4, lo: 0, sky: "cloud",
      skyText: "Gris y con algo de niebla",
      vibe: "Baños termales y mercadillos para plantarle cara al frío del Danubio.",
      cost: {
        lodging: 33, lodgingRange: [27, 45],
        food: { ajustado: 21, normal: 45 },
        local: 4,
        transfer: 13, transferNote: "Autobús 100E, 2.500 HUF por trayecto",
        sights: 23, sightsNote: "Baños Lukács entre semana (unos 18 €) y otra visita (5 €)"
      }
    },
    essaouira: {
      name: "Essaouira", country: "Marruecos", code: "ESU",
      flight: "3 h 40 min", hi: 18, lo: 10, sky: "cloud",
      skyText: "Fresco y ventoso, con sol a ratos",
      vibe: "Medina amurallada junto al Atlántico, puerto de pescadores y playa. Tranquila y muy barata.",
      cost: {
        lodging: 16, lodgingRange: [15, 20],
        food: { ajustado: 9, normal: 28 },
        local: 2,
        transfer: 8, transferNote: "Taxi compartido, a unos 15 km de la medina",
        sights: 8, sightsNote: "Skala, museos y otra visita (unos 8 €, estimación)"
      }
    },
    tanger: {
      name: "Tánger", country: "Marruecos", code: "TNG",
      flight: "2 h 55 min", hi: 16, lo: 10, sky: "cloud",
      skyText: "Templado, con lluvia posible",
      vibe: "Medina, kasbah y vistas al Estrecho de Gibraltar. África a un salto de Europa.",
      cost: {
        lodging: 16, lodgingRange: [13, 25],
        food: { ajustado: 8, normal: 26 },
        local: 3,
        transfer: 5, transferNote: "Autobús o taxi compartido",
        sights: 8, sightsNote: "Museo de la Kasbah y otra visita (unos 8 €, estimación)"
      }
    }
  },
  /*
    dep / arr: hora de la ida (hora local). next: llega al día siguiente.
    cart: vuelo en la cesta de easyJet (ida EJU1657, vuelta EJU1650 mié 16, 11:50 a 13:35).
  */
  options: []
};

(function () {
  const T = window.TRIP;
  const add = (dest, from, airline, out, ret, price, dep, arr, extra) => {
    T.options.push(Object.assign({
      id: [dest, from, airline, out, ret, dep || ""].join("-").replace(/[^\w-]/g, ""),
      dest, from, airline, out, ret, price, dep, arr
    }, extra));
  };

  // Atenas, desde Charleroi (Ryanair)
  add("atenas", "CRL", "Ryanair", 10, 13, 84);
  add("atenas", "CRL", "Ryanair", 10, 14, 93, "6:45", "10:55");
  add("atenas", "CRL", "Ryanair", 13, 17, 78, "9:35", "13:45");
  add("atenas", "CRL", "Ryanair", 13, 18, 86);
  add("atenas", "CRL", "Ryanair", 12, 17, 96);
  add("atenas", "CRL", "Ryanair", 10, 17, 83);
  add("atenas", "CRL", "Ryanair", 14, 18, 125, "20:45", "0:55", { next: true });

  // Praga, desde Lille (easyJet)
  add("praga", "LIL", "easyJet", 12, 16, 55, "17:00", "18:35", { cart: true, retDep: "11:50", retArr: "13:35" });
  // Praga, desde Charleroi (Ryanair)
  add("praga", "CRL", "Ryanair", 12, 16, 90, "14:25", "15:55");

  // Marrakech, desde Lille (easyJet)
  add("marrakech", "LIL", "easyJet", 10, 13, 127, "12:50", "15:25");
  add("marrakech", "LIL", "easyJet", 13, 17, 143, "11:55", "14:30");
  add("marrakech", "LIL", "easyJet", 10, 17, 117, "12:50", "15:25");
  // Marrakech, desde Charleroi (Ryanair)
  add("marrakech", "CRL", "Ryanair", 10, 14, 102, "14:10", "16:40");
  add("marrakech", "CRL", "Ryanair", 10, 15, 78, "14:10", "16:40");
  add("marrakech", "CRL", "Ryanair", 11, 15, 81, "11:05", "13:35");
  add("marrakech", "CRL", "Ryanair", 12, 16, 88, "14:30", "17:00");
  add("marrakech", "CRL", "Ryanair", 13, 17, 75, "15:20", "17:50");
  add("marrakech", "CRL", "Ryanair", 14, 18, 83, "19:00", "21:30");
  // Mismas fechas con otro horario
  add("marrakech", "CRL", "Ryanair", 10, 14, 110, "11:10", "13:40");
  add("marrakech", "CRL", "Ryanair", 11, 15, 82, "21:15", "23:45");
  add("marrakech", "CRL", "Ryanair", 12, 16, 92, "11:00", "13:30");

  // Budapest, desde Charleroi (Wizz Air y Ryanair)
  add("budapest", "CRL", "Ryanair", 10, 14, 72, "21:50", "23:50");
  add("budapest", "CRL", "Wizz Air", 10, 14, 95, "9:00", "11:00");
  add("budapest", "CRL", "Wizz Air", 11, 15, 68, "20:55", "23:00");
  add("budapest", "CRL", "Wizz Air", 11, 15, 117, "9:05", "11:05");
  add("budapest", "CRL", "Ryanair", 12, 16, 68, "21:20", "23:20");
  add("budapest", "CRL", "Wizz Air", 12, 16, 69, "9:15", "11:15");
  add("budapest", "CRL", "Ryanair", 13, 17, 59, "8:35", "10:35");
  add("budapest", "CRL", "Wizz Air", 13, 17, 63, "9:00", "11:00");
  add("budapest", "CRL", "Ryanair", 13, 17, 81, "17:40", "19:40");
  add("budapest", "CRL", "Wizz Air", 14, 18, 58, "9:00", "11:00");
  add("budapest", "CRL", "Ryanair", 14, 18, 66, "21:55", "23:55");

  // Essaouira, desde Charleroi (Ryanair)
  add("essaouira", "CRL", "Ryanair", 10, 13, 61);
  add("essaouira", "CRL", "Ryanair", 10, 15, 52);
  add("essaouira", "CRL", "Ryanair", 13, 17, 64, "13:35", "16:15");

  // Tánger, desde Charleroi (Ryanair)
  add("tanger", "CRL", "Ryanair", 10, 14, 75, "14:30", "16:25");
  add("tanger", "CRL", "Ryanair", 11, 15, 65, "20:05", "22:00");
  add("tanger", "CRL", "Ryanair", 12, 16, 76, "18:30", "20:25");
  add("tanger", "CRL", "Ryanair", 12, 16, 90, "13:10", "15:05");
  add("tanger", "CRL", "Ryanair", 13, 17, 93, "21:25", "23:20");
  add("tanger", "CRL", "Ryanair", 14, 18, 80, "21:00", "22:55");
})();
