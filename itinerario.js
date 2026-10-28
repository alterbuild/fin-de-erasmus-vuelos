/* Itinerario por Tirana: presupuesto por persona. Sin dependencias. */
(function () {
  "use strict";

  const T = window.TRIP;
  const $ = (s, r = document) => r.querySelector(s);
  const eur = (n) => Math.round(n) + " €";
  const plural = (n, one, many) => n + " " + (n === 1 ? one : many);

  const cost = T.dest.tirana.cost;
  const NIGHTS = 4;
  const DAYS = NIGHTS + 1;

  // Vuelo: el más barato de Charleroi del 13 al 17.
  const flight = Math.min.apply(
    null,
    T.options.filter((o) => o.dest === "tirana" && o.from === "CRL" && o.out === 13 && o.ret === 17).map((o) => o.price)
  );

  // Precios de esta página. Para cambiarlos, edita solo este bloque.
  const K = {
    apartment: 648 / 5, // La Gioia: 648 € las 4 noches por 5 apartamentos de 2 camas
    rent: 25, // alquiler de un coche de 5 plazas, 4 días (Kayak, 28 oct)
    cover: 36, // seguro a todo riesgo: unos 9 € al día por coche (estimación)
    fuel: 71, // 590 km a 6 l/100 km a unos 2 €/l, por coche
    parking: 15, // aparcamiento en Tirana y en los castillos, por coche
    sights: [
      ["Krujë: museo Skanderbeg", 5],
      ["Bunk'Art 1 y 2", 8],
      ["Berat: castillo y museo Onufri", 8],
      ["Shkodër: castillo de Rozafa y museo", 10]
    ],
    dajti: 16
  };

  const state = { people: 10, pace: "ajustado", bus: true, cover: true, dajti: false };

  function calc() {
    const n = state.people;
    const units = Math.ceil(n / 2);
    const cars = Math.ceil(n / 5);
    const food = cost.food[state.pace];
    const sights = K.sights.reduce((s, x) => s + x[1], 0) + (state.dajti ? K.dajti : 0);
    const rows = [{ k: "Vuelo", d: "Ryanair, Charleroi del 13 al 17", v: flight }];
    if (state.bus) rows.push({ k: "Autobús Lille a Charleroi", v: T.bus });
    rows.push({
      k: "Alojamiento",
      d: plural(units, "apartamento", "apartamentos") + " de 2 camas, " + eur(units * K.apartment) + " en total",
      v: (units * K.apartment) / n
    });
    rows.push({ k: "Alquiler de coches", d: plural(cars, "coche", "coches") + " de 5 plazas, 4 días", v: (cars * K.rent) / n });
    if (state.cover) rows.push({ k: "Seguro a todo riesgo", d: "Estimación: unos 9 € al día por coche", v: (cars * K.cover) / n });
    rows.push({ k: "Gasolina", d: "Unos 590 km por coche", v: (cars * K.fuel) / n });
    rows.push({ k: "Aparcamiento", d: "En Tirana y en los castillos", v: (cars * K.parking) / n });
    rows.push({ k: "Comida y salidas", d: plural(DAYS, "día", "días") + " a " + eur(food), v: food * DAYS });
    rows.push({
      k: "Entradas",
      d: K.sights.map((x) => x[0]).join(", ") + (state.dajti ? ", telecabina del Dajti" : ""),
      v: sights
    });
    const total = rows.reduce((s, r) => s + r.v, 0);
    // El mismo viaje sin coche, con los números de la comparativa.
    const plain =
      flight + (state.bus ? T.bus : 0) + cost.lodging * NIGHTS + food * DAYS + cost.local * DAYS + cost.transfer + cost.sights;
    return { rows: rows, total: total, plain: plain, units: units, cars: cars };
  }

  function render() {
    const c = calc();
    const n = state.people;
    $("#c-total").textContent = eur(c.total);
    $("#c-people").textContent = n;
    $("#c-minus").disabled = n <= 2;
    $("#c-plus").disabled = n >= 10;
    $("#c-people-help").textContent = plural(c.cars, "coche", "coches") + " y " + plural(c.units, "apartamento", "apartamentos");
    $("#c-group").textContent = "Para " + n + " personas: " + eur(c.total * n);
    $("#c-rows").innerHTML =
      c.rows
        .map(
          (r) =>
            '<div class="costs__row"><dt>' + r.k + (r.d ? "<small>" + r.d + "</small>" : "") + "</dt><dd>" + eur(r.v) + "</dd></div>"
        )
        .join("") +
      '<div class="costs__row costs__row--total"><dt>Total por persona</dt><dd>' + eur(c.total) + "</dd></div>";
    const diff = c.total - c.plain;
    $("#c-vs").textContent =
      "El mismo viaje sin coche, como en el comparador, sale a " + eur(c.plain) + ": el coche y las excursiones suman " +
      eur(diff) + " por persona.";
    const sum = $("#sum-total");
    const hero = $("#hero-total");
    if (n === 10 && state.pace === "ajustado" && state.bus && state.cover && !state.dajti) {
      if (sum) sum.textContent = eur(c.total);
      if (hero) hero.textContent = eur(c.total);
    }
    $("#c-pace").querySelectorAll("[role=radio]").forEach((b) => {
      const on = b.dataset.pace === state.pace;
      b.setAttribute("aria-checked", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    [["c-bus", "bus"], ["c-cover", "cover"], ["c-dajti", "dajti"]].forEach((p) => $("#" + p[0]).setAttribute("aria-checked", String(state[p[1]])));
  }

  // Controles
  $("#c-minus").addEventListener("click", () => { state.people = Math.max(2, state.people - 1); render(); });
  $("#c-plus").addEventListener("click", () => { state.people = Math.min(10, state.people + 1); render(); });
  $("#c-pace").addEventListener("click", (e) => {
    const b = e.target.closest("[data-pace]");
    if (b) { state.pace = b.dataset.pace; render(); }
  });
  $("#c-pace").addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    state.pace = state.pace === "ajustado" ? "normal" : "ajustado";
    render();
    $("#c-pace [aria-checked=true]").focus();
  });
  [["c-bus", "bus"], ["c-cover", "cover"], ["c-dajti", "dajti"]].forEach((p) =>
    $("#" + p[0]).addEventListener("click", () => { state[p[1]] = !state[p[1]]; render(); })
  );

  render();
})();
