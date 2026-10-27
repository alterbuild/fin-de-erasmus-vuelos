/* Fin de Erasmus: comparativa de vuelos. Sin dependencias. */
(function () {
  "use strict";

  const T = window.TRIP;
  const ORDER = ["atenas", "praga", "marrakech", "essaouira", "tanger", "budapest"];
  const BUS = T.bus;
  const COLOR = {
    atenas: "var(--atenas)",
    praga: "var(--praga)",
    marrakech: "var(--marrakech)",
    essaouira: "var(--essaouira)",
    tanger: "var(--tanger)",
    budapest: "var(--budapest)"
  };
  const ON = {
    atenas: "#fff", praga: "#fff", marrakech: "var(--ink)",
    essaouira: "#fff", tanger: "#fff", budapest: "#fff"
  };

  const state = {
    start: null,
    end: null,
    origin: "both",
    durs: new Set([5]),
    people: 10,
    bus: true,
    pace: "ajustado",
    view: "trip",
    picked: {},
    open: {},
    openBreak: {},
    last: {},
    ready: false
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const eur = (n) => Math.round(n) + " €";
  const FIRST = T.days[0].n;
  const LAST = T.days[T.days.length - 1].n;
  const day = (n) => T.days.find((d) => d.n === n);
  const short = (n) => day(n).w + " " + n;
  const pad = (n) => String(n).padStart(2, "0");
  const minus = (n) => String(n).replace("-", "−");
  const plural = (n, one, many) => n + " " + (n === 1 ? one : many);

  const ICON = {
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.6 4.2 4.2 0 0 0 7 18z"/></svg>',
    snow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/></svg>',
    plane: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
    out: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>'
  };

  const ART = {
    atenas: '<path d="M16 40 100 10 184 40Z"/><path d="M24 50H176"/><path d="M40 58V100M70 58V100M100 58V100M130 58V100M160 58V100"/><path d="M20 108H180"/>',
    praga: '<path d="M18 92V42L32 14 46 42V92"/><path d="M154 92V42L168 14 182 42V92"/><path d="M4 92H196"/><path d="M10 114A22 22 0 0 1 54 114M54 114A22 22 0 0 1 98 114M98 114A22 22 0 0 1 142 114M142 114A22 22 0 0 1 186 114"/>',
    marrakech: '<path d="M56 114V72C56 34 78 14 100 14S144 34 144 72V114"/><path d="M76 114V76C76 52 88 38 100 38S124 52 124 76V114"/>',
    essaouira: '<path d="M10 106H190"/><path d="M16 106V66H40V78H64V66H88V78H112V66H136V78H160V66H184V106"/><circle cx="150" cy="30" r="11"/><path d="M60 38 70 26 80 38M70 26V12"/>',
    tanger: '<path d="M86 108 95 48H115L124 108Z"/><path d="M92 48V36H118V48"/><path d="M105 36V16"/><path d="M96 24 114 24"/><path d="M8 116C28 106 48 124 68 116S108 124 128 116S168 106 192 116"/>',
    budapest: '<path d="M36 104C36 58 66 34 100 34S164 58 164 104"/><path d="M24 104H176"/><path d="M100 34V8"/><circle cx="30" cy="30" r="7"/><circle cx="174" cy="52" r="5"/><circle cx="48" cy="58" r="3.5"/>'
  };

  /* Datos derivados */

  const durKey = (o) => Math.min(o.ret - o.out + 1, 6);
  const eff = (o) => o.price + (o.from === "CRL" && state.bus ? BUS : 0);
  const range = () => [state.start === null ? FIRST : state.start, state.end === null ? LAST : state.end];

  function visible(o, opts) {
    if (state.origin !== "both" && o.from !== state.origin) return false;
    if (!state.durs.has(durKey(o))) return false;
    if (opts && opts.noRange) return true;
    const r = range();
    return o.out >= r[0] && o.ret <= r[1];
  }

  function listFor(d, opts) {
    return T.options
      .filter((o) => o.dest === d && visible(o, opts))
      .sort((a, b) => eff(a) - eff(b) || a.out - b.out);
  }

  function chosen(d) {
    const list = listFor(d);
    if (!list.length) return null;
    return list.find((o) => o.id === state.picked[d]) || list[0];
  }

  /* Coste estimado del viaje, por persona */
  function tripCost(o) {
    const c = T.dest[o.dest].cost;
    const nights = o.ret - o.out;
    const days = nights + 1;
    const food = c.food[state.pace];
    const rows = [{ k: "Vuelo", v: o.price }];
    if (o.from === "CRL" && state.bus) rows.push({ k: "Autobús Lille a Charleroi", v: BUS });
    rows.push({ k: "Alojamiento", d: plural(nights, "noche", "noches") + " a " + eur(c.lodging), v: c.lodging * nights });
    rows.push({ k: "Comida y salidas", d: plural(days, "día", "días") + " a " + eur(food), v: food * days });
    rows.push({ k: "Transporte en la ciudad", d: plural(days, "día", "días") + " a " + eur(c.local), v: c.local * days });
    rows.push({ k: "Del aeropuerto al centro y vuelta", v: c.transfer });
    rows.push({ k: "Entradas", d: c.sightsNote, v: c.sights });
    return { rows: rows, total: rows.reduce((s, r) => s + r.v, 0) };
  }

  const metric = (o) => (state.view === "trip" ? tripCost(o).total : eff(o));

  /* Enlaces */

  function flightsUrl(o) {
    const q = "Nonstop flights from " + o.from + " to " + T.dest[o.dest].code +
      " on 2026-12-" + pad(o.out) + " through 2026-12-" + pad(o.ret);
    return "https://www.google.com/travel/flights?q=" + encodeURIComponent(q) + "&curr=EUR&hl=es";
  }

  // Abre la web de la aerolínea con ruta, fechas y personas ya puestas.
  function buyUrl(o) {
    const code = T.dest[o.dest].code;
    const n = state.people;
    const a = "2026-12-" + pad(o.out);
    const b = "2026-12-" + pad(o.ret);
    if (o.airline === "easyJet") {
      return "https://www.easyjet.com/deeplink?lang=ES&dep=" + o.from + "&dest=" + code +
        "&dd=" + a + "&rd=" + b + "&apax=" + n + "&cpax=0&ipax=0&isOneWay=off";
    }
    if (o.airline === "Ryanair") {
      return "https://www.ryanair.com/es/es/trip/flights/select?adults=" + n +
        "&teens=0&children=0&infants=0&dateOut=" + a + "&dateIn=" + b +
        "&isConnectedFlight=false&discount=0&promoCode=&isReturn=true&originIata=" + o.from +
        "&destinationIata=" + code + "&tpAdults=" + n + "&tpTeens=0&tpChildren=0&tpInfants=0" +
        "&tpStartDate=" + a + "&tpEndDate=" + b + "&tpDiscount=0&tpPromoCode=&tpOriginIata=" + o.from +
        "&tpDestinationIata=" + code;
    }
    return "https://www.wizzair.com/es-es/booking/select-flight/" + o.from + "/" + code + "/" + a + "/" + b + "/" + n + "/0/0/null";
  }

  function arrivalTag(o) {
    if (!o.arr) return null;
    const h = Number(o.arr.split(":")[0]) + (o.next ? 24 : 0);
    if (h >= 22) return { t: "Llegas de noche", c: "tag--warn" };
    if (h < 12) return { t: "Llegas por la mañana", c: "tag--good" };
    return null;
  }

  const strip = (o) =>
    '<span class="strip" aria-hidden="true">' +
    T.days.map((x) => '<i class="' + (x.n >= o.out && x.n <= o.ret ? "on" : "") + '"></i>').join("") +
    "</span>";

  /* Construcción inicial */

  function buildRibbon() {
    $("#ribbon").style.setProperty("--cols", T.days.length);
    $("#ribbon").innerHTML = T.days
      .map(
        (d, i) =>
          '<li><button type="button" class="day" data-day="' + d.n + '" style="--i:' + i + '" aria-pressed="false">' +
          '<span class="day__w">' + d.w + "</span>" +
          '<span class="day__n">' + d.n + "</span>" +
          '<span class="day__dots" aria-hidden="true"></span></button></li>'
      )
      .join("");
  }

  function buildLegend() {
    $("#legend").innerHTML =
      "<span>Un punto marca el día de ida de cada destino:</span>" +
      ORDER.map(
        (d) =>
          '<span class="legend__item"><span class="dot" style="--c:' + COLOR[d] + '"></span>' + T.dest[d].name + "</span>"
      ).join("");
  }

  function buildBars() {
    $("#bars").innerHTML = ORDER.map(
      (d) =>
        '<li class="bar-row" id="bar-' + d + '" style="--c:' + COLOR[d] + '">' +
        '<span class="bar-row__name">' + T.dest[d].name + "</span>" +
        '<span class="bar-track"><span class="bar-fill"><span class="bar-fill__flight"></span></span></span>' +
        '<span class="bar-row__val"><span class="bar-price"></span><span class="bar-sub"></span></span></li>'
    ).join("");
  }

  function buildTemps() {
    const TMIN = -4;
    const TMAX = 24;
    const pos = (t) => ((t - TMIN) / (TMAX - TMIN)) * 100;
    const rows = ORDER.slice().sort((a, b) => T.dest[b].hi - T.dest[a].hi);
    $("#temps").innerHTML =
      rows
        .map((d) => {
          const m = T.dest[d];
          return (
            '<li class="temp-row" style="--c:' + COLOR[d] + ';--on:' + ON[d] + '">' +
            '<span class="temp-row__name"><span class="bar-row__name">' + m.name + "</span>" +
            "<small>" + minus(m.lo) + "° a " + minus(m.hi) + "°</small></span>" +
            '<span class="temp-track" style="--zero:' + pos(0) + '%">' +
            '<span class="temp-pill" style="--l:' + pos(m.lo) + "%;--wd:" + (pos(m.hi) - pos(m.lo)) + '%"></span></span></li>'
          );
        })
        .join("") +
      '<li class="temp-axis" aria-hidden="true"><span></span><span class="temp-axis__scale">' +
      [0, 10, 20].map((t) => '<span style="left:' + pos(t) + '%">' + t + "°</span>").join("") +
      "</span></li>";
  }

  function buildPosters() {
    $("#posters").innerHTML = ORDER.map((d) => {
      const m = T.dest[d];
      return (
        '<article class="poster poster--' + d + '" id="poster-' + d + '" aria-labelledby="h-' + d + '">' +
        '<svg class="poster__art" viewBox="0 0 200 120" aria-hidden="true">' + ART[d] + "</svg>" +
        '<header class="poster__head"><h2 class="poster__name" id="h-' + d + '">' + m.name + "</h2>" +
        '<p class="poster__country">' + m.country + "</p></header>" +
        '<ul class="facts">' +
        "<li>" + ICON.clock + "<span>Vuelo de " + m.flight + "</span></li>" +
        "<li>" + ICON[m.sky] + "<span>" + minus(m.hi) + "° de día y " + minus(m.lo) + "° de noche<small>" + m.skyText + "</small></span></li>" +
        "</ul>" +
        '<p class="poster__vibe">' + m.vibe + "</p>" +
        '<div class="poster__slot" data-slot="ticket"></div>' +
        '<div class="poster__slot" data-slot="more"></div>' +
        "</article>"
      );
    }).join("");
  }

  /* Pintado */

  function statusText() {
    const s = state.start;
    const e = state.end;
    if (s === null) return "Mostrando todo el periodo. Toca tu día de ida y luego el de vuelta para acotar.";
    if (e === null) return "Ida el " + day(s).long + " " + s + ". Ahora toca el día de vuelta.";
    const n = e - s;
    return "Del " + day(s).long + " " + s + " al " + day(e).long + " " + e + " de diciembre (" + plural(n, "noche", "noches") + ").";
  }

  function updateRibbon() {
    const r = range();
    $$(".day").forEach((b) => {
      const n = Number(b.dataset.day);
      const edge = n === state.start || n === state.end;
      const inside = state.start !== null && state.end !== null && n > r[0] && n < r[1];
      b.classList.toggle("is-edge", edge);
      b.classList.toggle("is-in", inside);
      b.setAttribute("aria-pressed", String(edge));
      const ds = ORDER.filter((d) => T.options.some((o) => o.dest === d && o.out === n && visible(o, { noRange: true })));
      $(".day__dots", b).innerHTML = ds.map((d) => '<span class="dot" style="--c:' + COLOR[d] + '"></span>').join("");
      b.setAttribute(
        "aria-label",
        day(n).long + " " + n + " de diciembre. " +
          (ds.length ? "Salen vuelos a " + ds.map((d) => T.dest[d].name).join(", ") + "." : "No salen vuelos directos.")
      );
    });
  }

  function setRadios(sel, key, value) {
    $$(sel + " [role=radio]").forEach((b) => {
      const on = b.dataset[key] === value;
      b.setAttribute("aria-checked", String(on));
      b.tabIndex = on ? 0 : -1;
    });
  }

  function updateControls() {
    setRadios("#origin", "origin", state.origin);
    setRadios("#pace", "pace", state.pace);
    setRadios("#view", "view", state.view);
    $$("#durations button").forEach((b) => b.setAttribute("aria-pressed", String(state.durs.has(Number(b.dataset.dur)))));
    $("#people").textContent = state.people;
    $("[data-action=people-minus]").disabled = state.people <= 1;
    $("[data-action=people-plus]").disabled = state.people >= 10;
    $("#bus").setAttribute("aria-checked", String(state.bus));
    $("#group-note").hidden = state.people < 10;
    $("#range-status").textContent = statusText();
    $("#range-reset").hidden = state.start === null;
  }

  function tripHTML(d, o) {
    const t = tripCost(o);
    const c = T.dest[d].cost;
    const rows = t.rows
      .map(
        (r) =>
          '<div class="costs__row"><dt>' + r.k + (r.d ? "<small>" + r.d + "</small>" : "") + "</dt><dd>" + eur(r.v) + "</dd></div>"
      )
      .join("");
    return (
      '<div class="trip">' +
      '<p class="trip__label">Viaje completo, estimado</p>' +
      '<p class="trip__num">' + eur(t.total) + "<span> por persona</span></p>" +
      (state.people > 1 ? '<p class="trip__group">Para ' + state.people + " personas: " + eur(t.total * state.people) + "</p>" : "") +
      '<details class="breakdown" data-dest="' + d + '"' + (state.openBreak[d] ? " open" : "") + ">" +
      "<summary>Ver el desglose</summary>" +
      '<dl class="costs">' + rows +
      '<div class="costs__row costs__row--total"><dt>Total por persona</dt><dd>' + eur(t.total) + "</dd></div></dl>" +
      '<p class="costs__note">Alojamiento: apartamentos para 10, de ' + c.lodgingRange[0] + " a " + c.lodgingRange[1] +
      " € por persona y noche. Traslado: " + c.transferNote + ".</p>" +
      "</details></div>"
    );
  }

  function buyHTML(d, o) {
    const m = T.dest[d];
    const what = m.name + " del " + o.out + " al " + o.ret;
    return (
      '<a class="btn" href="' + buyUrl(o) + '" target="_blank" rel="noopener" aria-label="Comprar ' + what + " en " + o.airline + ', se abre en otra pestaña">' +
      "Comprar en " + o.airline + ICON.out + "</a>" +
      '<a class="btn btn--ghost" href="' + flightsUrl(o) + '" target="_blank" rel="noopener" aria-label="Ver ' + what + ' en Google Flights, se abre en otra pestaña">' +
      "Ver en Google Flights" + ICON.out + "</a>" +
      '<p class="buyhint">Se abre ' + o.airline + " con la ruta, las fechas y " + plural(state.people, "persona", "personas") + " ya puestas. Ahí eliges la hora.</p>"
    );
  }

  function ticketHTML(d, o, isNew) {
    const m = T.dest[d];
    const crl = o.from === "CRL";
    const nights = o.ret - o.out;
    const price = eff(o);
    const tags = ['<li class="tag">' + (crl ? "Desde Charleroi" : "Directo desde Lille") + "</li>"];
    const at = arrivalTag(o);
    if (at) tags.push('<li class="tag ' + at.c + '">' + at.t + "</li>");
    if (state.people >= 10 && o.airline === "easyJet") tags.push('<li class="tag tag--warn">Reserva de grupo</li>');

    let time = "Hora de ida por confirmar.";
    if (o.dep) time = "Ida de " + o.dep + " a " + o.arr + (o.next ? " del día siguiente" : "") + ".";
    if (o.retDep) time += " Vuelta de " + o.retDep + " a " + o.retArr + ".";

    const split = crl
      ? state.bus ? "Vuelo " + eur(o.price) + " más autobús " + eur(BUS) : "Sin contar el autobús a Charleroi"
      : "Sin autobús";

    return (
      '<div class="ticket' + (isNew ? " is-new" : "") + '">' +
      '<div class="ticket__body">' +
      (o.cart ? '<span class="stamp">En tu cesta de easyJet</span>' : "") +
      '<div class="route" role="img" aria-label="De ' + T.origins[o.from] + " a " + m.name + '">' +
      "<span>" + o.from + '</span><span class="route__line">' + ICON.plane + "</span><span>" + m.code + "</span></div>" +
      '<p class="ticket__dates">' + short(o.out) + " dic a " + short(o.ret) + " dic</p>" +
      '<p class="ticket__meta">' + plural(nights, "noche", "noches") + " con " + o.airline + ". " + time + "</p>" +
      '<ul class="tags">' + tags.join("") + "</ul>" +
      strip(o) +
      "</div>" +
      '<div class="ticket__stub">' +
      '<div class="price"><span class="price__num">' + eur(price) + '</span><span class="price__unit">el vuelo, por persona</span></div>' +
      '<p class="price__split">' + split + "</p>" +
      (state.people > 1 ? '<p class="price__total">Vuelos para ' + state.people + ": " + eur(price * state.people) + "</p>" : "") +
      tripHTML(d, o) +
      buyHTML(d, o) +
      "</div></div>"
    );
  }

  function moreHTML(d, list, cur) {
    const items = list
      .map(
        (o) =>
          '<button type="button" class="alt" data-dest="' + d + '" data-opt="' + o.id + '" aria-pressed="' + (o.id === cur.id) + '">' +
          '<span class="alt__dates">' + short(o.out) + " a " + short(o.ret) + "</span>" +
          '<span class="alt__price">' + eur(metric(o)) + "</span>" +
          '<span class="alt__sub">' + o.airline + ", desde " + T.origins[o.from] + (o.dep ? ", ida " + o.dep : "") + "</span>" +
          strip(o) +
          "</button>"
      )
      .join("");
    return (
      '<details class="more" data-dest="' + d + '"' + (state.open[d] ? " open" : "") + ">" +
      "<summary>Otras fechas (" + (list.length - 1) + ")</summary>" +
      '<div class="alts">' + items + "</div></details>"
    );
  }

  function emptyHTML() {
    return (
      '<div class="empty"><p>No hay vuelo directo con estos filtros. Prueba otras fechas, otro origen o más días de viaje.</p>' +
      '<button type="button" class="btn" data-action="reset">Quitar filtros</button></div>'
    );
  }

  function renderPosters() {
    ORDER.forEach((d) => {
      const root = $("#poster-" + d);
      const o = chosen(d);
      const list = listFor(d);
      const slotT = $("[data-slot=ticket]", root);
      const slotM = $("[data-slot=more]", root);
      if (!o) {
        slotT.innerHTML = emptyHTML();
        slotM.innerHTML = "";
        state.last[d] = null;
        return;
      }
      const isNew = state.ready && state.last[d] !== o.id;
      state.last[d] = o.id;
      slotT.innerHTML = ticketHTML(d, o, isNew);
      slotM.innerHTML = list.length > 1 ? moreHTML(d, list, o) : "";
    });
  }

  function renderBars() {
    const trip = state.view === "trip";
    const rows = ORDER.map((d) => ({ d: d, o: chosen(d) }));
    const vals = rows.filter((r) => r.o).map((r) => metric(r.o));
    const max = Math.max.apply(null, [trip ? 300 : 150].concat(vals)) * 1.04;
    rows
      .slice()
      .sort((a, b) => (a.o && b.o ? metric(a.o) - metric(b.o) : a.o ? -1 : b.o ? 1 : 0))
      .forEach((r, i) => {
        const li = $("#bar-" + r.d);
        li.style.setProperty("--order", i);
        li.classList.toggle("is-empty", !r.o);
        $(".bar-fill", li).style.setProperty("--w", r.o ? (metric(r.o) / max) * 100 + "%" : "0%");
        $(".bar-fill__flight", li).style.setProperty("--fw", r.o && trip ? (eff(r.o) / metric(r.o)) * 100 + "%" : "100%");
        $(".bar-price", li).textContent = r.o ? eur(metric(r.o)) : "Sin vuelo";
        $(".bar-sub", li).textContent = r.o
          ? trip
            ? plural(r.o.ret - r.o.out, "noche", "noches") + ", vuelo " + eur(eff(r.o)) + " desde " + T.origins[r.o.from]
            : r.o.out + " a " + r.o.ret + " dic, " + T.origins[r.o.from]
          : "directo con estos filtros";
      });
    $("#bars-note").textContent = trip
      ? "Por persona: vuelo, alojamiento, comida, transporte y entradas. La parte fuerte de cada barra es el vuelo." +
        (state.bus ? " Charleroi incluye el autobús." : "")
      : "Solo el vuelo, por persona, ida y vuelta" + (state.bus ? ", con el autobús a Charleroi incluido" : "") +
        ". Cada destino muestra la fecha que elijas, por defecto la más barata.";
  }

  function update() {
    updateRibbon();
    updateControls();
    renderPosters();
    renderBars();
  }

  /* Acciones */

  function pickDay(n) {
    if (state.start === null || state.end !== null) {
      state.start = n;
      state.end = null;
    } else if (n === state.start) {
      state.start = null;
    } else {
      state.end = Math.max(n, state.start);
      state.start = Math.min(n, state.start);
    }
    state.picked = {};
  }

  function summaryText() {
    const lines = [
      "Fin de Erasmus. Vuelos directos y coste estimado del viaje, por persona (" + plural(state.people, "persona", "personas") +
        ", comida y salidas en ritmo " + state.pace + ", precios de estudiante" + (state.bus ? ", Charleroi con " + BUS + " € de autobús" : "") + "):"
    ];
    ORDER.forEach((d) => {
      const o = chosen(d);
      const n = T.dest[d].name;
      lines.push(
        o
          ? n + ": " + o.out + " a " + o.ret + " dic, vuelo " + eff(o) + " €, viaje completo unos " + Math.round(tripCost(o).total) +
            " € (" + T.origins[o.from] + ", " + o.airline + ")"
          : n + ": sin vuelo directo con estos filtros"
      );
    });
    lines.push("Precios de Google Flights del " + T.checked + ". Son estimaciones y pueden cambiar.");
    if (/^https?:/.test(location.href)) lines.push(location.href.split("#")[0]);
    return lines.join("\n");
  }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 2200);
  }

  async function copySummary() {
    const text = summaryText();
    try {
      await navigator.clipboard.writeText(text);
      toast("Resumen copiado");
    } catch (err) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0;top:0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
      ta.remove();
      toast(ok ? "Resumen copiado" : "No se pudo copiar. Selecciona el texto a mano.");
    }
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;

    if (t.classList.contains("day")) {
      pickDay(Number(t.dataset.day));
      return update();
    }
    if (t.dataset.origin) {
      state.origin = t.dataset.origin;
      state.picked = {};
      return update();
    }
    if (t.dataset.pace) {
      state.pace = t.dataset.pace;
      return update();
    }
    if (t.dataset.view) {
      state.view = t.dataset.view;
      return update();
    }
    if (t.dataset.dur) {
      const k = Number(t.dataset.dur);
      state.durs.has(k) ? state.durs.delete(k) : state.durs.add(k);
      state.picked = {};
      return update();
    }
    if (t.id === "bus") {
      state.bus = !state.bus;
      return update();
    }
    if (t.dataset.opt) {
      state.picked[t.dataset.dest] = t.dataset.opt;
      update();
      const again = document.querySelector('.alt[data-opt="' + t.dataset.opt + '"]');
      if (again) again.focus({ preventScroll: true });
      return;
    }
    switch (t.dataset.action) {
      case "people-minus": state.people = Math.max(1, state.people - 1); return update();
      case "people-plus": state.people = Math.min(10, state.people + 1); return update();
      case "clear-range": state.start = null; state.end = null; state.picked = {}; return update();
      case "reset":
        state.start = null;
        state.end = null;
        state.origin = "both";
        state.durs = new Set([4, 5, 6]);
        state.picked = {};
        return update();
      case "copy": return copySummary();
      default:
    }
  });

  // Recuerda qué desplegables están abiertos en cada destino.
  document.addEventListener("toggle", (e) => {
    const el = e.target;
    if (!el.closest) return;
    const more = el.closest("details.more");
    if (more) state.open[more.dataset.dest] = more.open;
    const br = el.closest("details.breakdown");
    if (br) state.openBreak[br.dataset.dest] = br.open;
  }, true);

  // Flechas del teclado dentro de los grupos de opciones.
  [["#origin", "origin"], ["#pace", "pace"], ["#view", "view"]].forEach((pair) => {
    $(pair[0]).addEventListener("keydown", (e) => {
      const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      if (!keys.includes(e.key)) return;
      const btns = $$("[role=radio]", e.currentTarget);
      const i = btns.findIndex((b) => b.getAttribute("aria-checked") === "true");
      const back = e.key === "ArrowLeft" || e.key === "ArrowUp";
      const n = (i + (back ? -1 : 1) + btns.length) % btns.length;
      state[pair[1]] = btns[n].dataset[pair[1]];
      if (pair[1] === "origin") state.picked = {};
      update();
      btns[n].focus();
      e.preventDefault();
    });
  });

  /* Arranque */

  $("#checked").textContent = T.checked;
  buildRibbon();
  buildLegend();
  buildBars();
  buildTemps();
  buildPosters();
  $("#ribbon").classList.add("is-intro");
  update();
  state.ready = true;
  setTimeout(() => $("#ribbon").classList.remove("is-intro"), 1500);
})();
