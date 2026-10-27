/* Fin de Erasmus: comparativa de vuelos. Sin dependencias. */
(function () {
  "use strict";

  const T = window.TRIP;
  const ORDER = ["atenas", "praga", "marrakech", "budapest"];
  const BUS = T.bus;
  const COLOR = {
    atenas: "var(--atenas)",
    praga: "var(--praga)",
    marrakech: "var(--marrakech)",
    budapest: "var(--budapest)"
  };
  const ON = { atenas: "#fff", praga: "#fff", marrakech: "var(--ink)", budapest: "#fff" };

  const state = {
    start: null,
    end: null,
    origin: "both",
    durs: new Set([4, 5]),
    people: 10,
    bus: true,
    picked: {},
    open: {},
    last: {},
    ready: false
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const eur = (n) => n + " €";
  const day = (n) => T.days[n - 9];
  const short = (n) => day(n).w + " " + n;
  const pad = (n) => String(n).padStart(2, "0");
  const minus = (n) => String(n).replace("-", "−");

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
    budapest: '<path d="M36 104C36 58 66 34 100 34S164 58 164 104"/><path d="M24 104H176"/><path d="M100 34V8"/><circle cx="30" cy="30" r="7"/><circle cx="174" cy="52" r="5"/><circle cx="48" cy="58" r="3.5"/>'
  };

  /* Datos derivados */

  const durKey = (o) => Math.min(o.ret - o.out + 1, 6);
  const eff = (o) => o.price + (o.from === "CRL" && state.bus ? BUS : 0);
  const range = () => [state.start === null ? 9 : state.start, state.end === null ? 18 : state.end];

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

  function flightsUrl(o) {
    const q = "Nonstop flights from " + o.from + " to " + T.dest[o.dest].code +
      " on 2026-12-" + pad(o.out) + " through 2026-12-" + pad(o.ret);
    return "https://www.google.com/travel/flights?q=" + encodeURIComponent(q) + "&curr=EUR&hl=es";
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
        '<span class="bar-track"><span class="bar-fill"></span></span>' +
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
    return "Del " + day(s).long + " " + s + " al " + day(e).long + " " + e + " de diciembre (" + n + " " + (n === 1 ? "noche" : "noches") + ").";
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

  function updateControls() {
    $$("#origin [role=radio]").forEach((b) => {
      const on = b.dataset.origin === state.origin;
      b.setAttribute("aria-checked", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    $$("#durations button").forEach((b) => b.setAttribute("aria-pressed", String(state.durs.has(Number(b.dataset.dur)))));
    $("#people").textContent = state.people;
    $("[data-action=people-minus]").disabled = state.people <= 1;
    $("[data-action=people-plus]").disabled = state.people >= 10;
    $("#bus").setAttribute("aria-checked", String(state.bus));
    $("#group-note").hidden = state.people < 10;
    $("#range-status").textContent = statusText();
    $("#range-reset").hidden = state.start === null;
  }

  function ticketHTML(d, o, isNew) {
    const m = T.dest[d];
    const crl = o.from === "CRL";
    const nights = o.ret - o.out;
    const price = eff(o);
    const tags = ['<li class="tag">' + (crl ? "Desde Charleroi" : "Directo desde Lille") + "</li>"];
    const at = arrivalTag(o);
    if (at) tags.push('<li class="tag ' + at.c + '">' + at.t + "</li>");
    if (state.people >= 10 && o.airline === "easyJet") tags.push('<li class="tag tag--warn">Precio de grupo por confirmar</li>');

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
      '<p class="ticket__meta">' + nights + " noches con " + o.airline + ". " + time + "</p>" +
      '<ul class="tags">' + tags.join("") + "</ul>" +
      strip(o) +
      "</div>" +
      '<div class="ticket__stub">' +
      '<div class="price"><span class="price__num">' + eur(price) + '</span><span class="price__unit">por persona</span></div>' +
      '<p class="price__split">' + split + "</p>" +
      (state.people > 1 ? '<p class="price__total">' + state.people + " personas: " + eur(price * state.people) + "</p>" : "") +
      '<a class="btn" href="' + flightsUrl(o) + '" target="_blank" rel="noopener" aria-label="Ver ' + m.name + " del " + o.out + " al " + o.ret + ' en Google Flights, se abre en otra pestaña">Ver en Google Flights' + ICON.out + "</a>" +
      "</div></div>"
    );
  }

  function moreHTML(d, list, cur) {
    const items = list
      .map(
        (o) =>
          '<button type="button" class="alt" data-dest="' + d + '" data-opt="' + o.id + '" aria-pressed="' + (o.id === cur.id) + '">' +
          '<span class="alt__dates">' + short(o.out) + " a " + short(o.ret) + "</span>" +
          '<span class="alt__price">' + eur(eff(o)) + "</span>" +
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
    const rows = ORDER.map((d) => ({ d: d, o: chosen(d) }));
    const max = Math.max.apply(null, [150].concat(rows.filter((r) => r.o).map((r) => eff(r.o)))) * 1.05;
    rows
      .slice()
      .sort((a, b) => (a.o && b.o ? eff(a.o) - eff(b.o) : a.o ? -1 : b.o ? 1 : 0))
      .forEach((r, i) => {
        const li = $("#bar-" + r.d);
        li.style.setProperty("--order", i);
        li.classList.toggle("is-empty", !r.o);
        $(".bar-fill", li).style.setProperty("--w", r.o ? (eff(r.o) / max) * 100 + "%" : "0%");
        $(".bar-price", li).textContent = r.o ? eur(eff(r.o)) : "Sin vuelo";
        $(".bar-sub", li).textContent = r.o
          ? r.o.out + " a " + r.o.ret + " dic, " + T.origins[r.o.from]
          : "directo con estos filtros";
      });
    $("#bars-note").textContent =
      "Por persona, ida y vuelta" + (state.bus ? ", con el autobús a Charleroi incluido" : "") +
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
      "Fin de Erasmus. Vuelos directos para " + state.people + (state.people === 1 ? " persona" : " personas") +
        ", precio por persona, ida y vuelta" + (state.bus ? " (Charleroi incluye " + BUS + " € de autobús)" : "") + ":"
    ];
    ORDER.forEach((d) => {
      const o = chosen(d);
      const n = T.dest[d].name;
      lines.push(
        o
          ? n + ": " + o.out + " a " + o.ret + " dic, " + eff(o) + " € (" + T.origins[o.from] + ", " + o.airline + ")"
          : n + ": sin vuelo directo con estos filtros"
      );
    });
    lines.push("Precios de Google Flights del " + T.checked + ". Pueden cambiar.");
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

  // Recuerda si "Otras fechas" está abierto en cada destino.
  document.addEventListener("toggle", (e) => {
    const d = e.target.closest && e.target.closest("details.more");
    if (d) state.open[d.dataset.dest] = d.open;
  }, true);

  $("#origin").addEventListener("keydown", (e) => {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!keys.includes(e.key)) return;
    const btns = $$("[role=radio]", e.currentTarget);
    const i = btns.findIndex((b) => b.getAttribute("aria-checked") === "true");
    const back = e.key === "ArrowLeft" || e.key === "ArrowUp";
    const n = (i + (back ? -1 : 1) + btns.length) % btns.length;
    state.origin = btns[n].dataset.origin;
    state.picked = {};
    update();
    btns[n].focus();
    e.preventDefault();
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
