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
  dest: {
    atenas: {
      name: "Atenas", country: "Grecia", code: "ATH",
      flight: "3 h 10 min", hi: 14, lo: 8, sky: "cloud",
      skyText: "Nubes y algún chubasco",
      vibe: "Acrópolis, Plaka y el Ágora al aire libre, con unos 14 grados.",
      cost: {
        lodging: 32, lodgingRange: [26, 38],
        food: { ajustado: 42, normal: 72 },
        local: 4,
        transfer: 16, transferNote: "Metro del aeropuerto, 16 € ida y vuelta",
        sights: 40, sightsNote: "Acrópolis (30 €) y otra visita (10 €)"
      }
    },
    praga: {
      name: "Praga", country: "Chequia", code: "PRG",
      flight: "1 h 30 min", hi: 3, lo: -1, sky: "snow",
      skyText: "Gris y con posible nieve",
      vibe: "Mercadillos de Navidad, puentes y casco antiguo, con frío de invierno.",
      cost: {
        lodging: 36, lodgingRange: [31, 45],
        food: { ajustado: 27, normal: 50 },
        local: 5,
        transfer: 4, transferNote: "Autobús 119 y metro",
        sights: 28, sightsNote: "Castillo de Praga (18 €) y otra visita (10 €)"
      }
    },
    marrakech: {
      name: "Marrakech", country: "Marruecos", code: "RAK",
      flight: "3 h 30 min", hi: 19, lo: 6, sky: "sun",
      skyText: "Seco y soleado, noches frías",
      vibe: "El único con días soleados y cálidos: zocos, riads y el Atlas a un día.",
      cost: {
        lodging: 25, lodgingRange: [19, 33],
        food: { ajustado: 11, normal: 35 },
        local: 4,
        transfer: 6, transferNote: "Autobús o taxi compartido",
        sights: 26, sightsNote: "Jardín Majorelle (16 €) y otra visita (10 €)"
      }
    },
    budapest: {
      name: "Budapest", country: "Hungría", code: "BUD",
      flight: "2 h", hi: 4, lo: 0, sky: "cloud",
      skyText: "Gris y con algo de niebla",
      vibe: "Baños termales y mercadillos para plantarle cara al frío del Danubio.",
      cost: {
        lodging: 33, lodgingRange: [27, 45],
        food: { ajustado: 32, normal: 57 },
        local: 4,
        transfer: 13, transferNote: "Autobús 100E, 2.500 HUF por trayecto",
        sights: 40, sightsNote: "Baños Széchenyi (30 €) y otra visita (10 €)"
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
})();
