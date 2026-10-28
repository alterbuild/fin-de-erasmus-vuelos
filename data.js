/*
  Datos de la comparativa. Para actualizar precios, edita solo este archivo.
  Precios: Google Flights, 27 de octubre de 2026 (Estambul, 28 de octubre), 1 adulto,
  ida y vuelta, solo vuelos directos, sin maleta de bodega.
*/
window.TRIP = {
  checked: "27 de octubre de 2026 (Estambul, el 28)",
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
    Fotos de Wikimedia Commons con licencia libre. Cada una está en img/<destino>.jpg
    (carteles) e img/<destino>-sm.jpg (cabecera). pos es el punto de enfoque al recortar.
  */
  photos: {
    atenas: {
      alt: "La Acrópolis de Atenas sobre su colina, vista desde la colina de Filopapo",
      pos: "62% 45%", by: "A.Savin", lic: "CC BY-SA 3.0",
      licUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Attica_06-13_Athens_50_View_from_Philopappos_-_Acropolis_Hill.jpg"
    },
    praga: {
      alt: "El castillo de Praga sobre los tejados rojos y el río Moldava",
      pos: "50% 0%", by: "Scotch Mist", lic: "CC BY-SA 4.0",
      licUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      page: "https://commons.wikimedia.org/wiki/File:Prague_Charles_Bridge_2021_11.jpg"
    },
    marrakech: {
      alt: "La plaza Jemaa el-Fnaa de Marrakech al atardecer, con el minarete de la Kutubía al fondo",
      pos: "62% 50%", by: "Herokk", lic: "CC BY-SA 4.0",
      licUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      page: "https://commons.wikimedia.org/wiki/File:Jemaa_el-Fnaa_Marrakech_at_sunset.jpg"
    },
    essaouira: {
      alt: "Barcas de pesca azules amontonadas en el puerto de Essaouira",
      pos: "50% 50%", by: "Mustang Joe", lic: "CC0",
      licUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      page: "https://commons.wikimedia.org/wiki/File:Fishing_boats_of_Essaouira_-_Morocco.jpg"
    },
    tanger: {
      alt: "El faro del cabo Espartel junto al mar azul, a las afueras de Tánger",
      pos: "84% 50%", by: "Diego Delso", lic: "CC BY-SA 4.0",
      licUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      page: "https://commons.wikimedia.org/wiki/File:Faro_del_cabo_Espartel,_Marruecos,_2015-12-11,_DD_02.JPG"
    },
    estambul: {
      alt: "El patio de la Mezquita Azul de Estambul iluminado al anochecer, con sus minaretes",
      pos: "50% 50%", by: "Benh Lieu Song", lic: "CC BY-SA 3.0",
      licUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Blue_Mosque_Courtyard_Dusk_Wikimedia_Commons.jpg"
    },
    budapest: {
      alt: "El Puente de las Cadenas de Budapest iluminado de noche, con el Danubio y el castillo detrás",
      pos: "60% 50%", by: "Wilfredor", lic: "CC0",
      licUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      page: "https://commons.wikimedia.org/wiki/File:Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg"
    }
  },
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
    },
    estambul: {
      name: "Estambul", country: "Turquía", code: "SAW",
      flight: "3 h 20 min", hi: 11, lo: 5, sky: "cloud",
      skyText: "Gris y con lluvia la mitad de los días",
      vibe: "Santa Sofía, la Mezquita Azul, el Gran Bazar y los ferris del Bósforo, con frío húmedo.",
      cost: {
        lodging: 18, lodgingRange: [14, 22],
        food: { ajustado: 17, normal: 35 },
        local: 4,
        transfer: 8, transferNote: "Metro M4 y Marmaray desde Sabiha Gökçen (hora y media), más la Istanbulkart (unos 3 €)",
        sights: 42, sightsNote: "Cisterna Basílica (unos 27 €) y Museos Arqueológicos (15 €). Santa Sofía (planta baja), la Mezquita Azul y el Gran Bazar son gratis"
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

  // Estambul (Sabiha Gökçen), desde Charleroi (Pegasus). La vuelta cuesta unos 57 € cualquier día.
  const ist = (out, ret, price, dep, arr, extra) =>
    add("estambul", "CRL", "Pegasus", out, ret, price, dep, arr, Object.assign({ retDep: ret === 18 ? "12:20" : "12:25", retArr: ret === 18 ? "13:50" : "13:55" }, extra));
  ist(10, 13, 128, "11:10", "16:30");
  ist(10, 14, 128, "11:10", "16:30");
  ist(10, 15, 128, "11:10", "16:30");
  ist(10, 17, 128, "11:10", "16:30");
  ist(11, 14, 154, "14:45", "20:00");
  ist(11, 15, 154, "14:45", "20:00");
  ist(11, 16, 154, "14:45", "20:00");
  ist(12, 16, 183, "15:00", "20:20");
  ist(13, 16, 185, "11:25", "16:45");
  ist(13, 17, 185, "11:25", "16:45");
  ist(13, 18, 185, "11:25", "16:45");
  ist(14, 18, 184, "11:25", "16:45");
  // Mismas fechas con otro horario
  ist(13, 17, 189, "18:00", "23:20");
  ist(13, 17, 191, "15:00", "20:20");
  ist(11, 15, 157, "11:25", "16:45");
  ist(12, 16, 191, "18:00", "23:20");
})();
