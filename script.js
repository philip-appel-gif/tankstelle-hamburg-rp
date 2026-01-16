const RABATT = { Keine: 0, Bronze: 5, Platin: 10 };
let spieler = [], produkte = [], cart = [];

async function login() {
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.value, passwort: pw.value })
  });
  if (res.ok) loadAll();
  else alert("Login falsch");
}

async function loadAll() {
  spieler = await (await fetch("/spieler")).json();
  produkte = await (await fetch("/produkte")).json();

  spielerListe.innerHTML = "";
  kunde.innerHTML = "";
  spieler.forEach(s => {
    spielerListe.innerHTML += `<li>${s.name} (${s.karte})</li>`;
    kunde.innerHTML += `<option value="${s._id}">${s.name}</option>`;
  });

  produkt.innerHTML = "";
  produkte.forEach(p => {
    produkt.innerHTML += `<option value="${p._id}">${p.name}</option>`;
  });
}

async function addSpieler() {
  await fetch("/spieler", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: spielerName.value, karte: spielerKarte.value })
  });
  loadAll();
}

async function addProdukt() {
  await fetch("/produkte", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: produktName.value, preis: +produktPreis.value })
  });
  loadAll();
}

function addToCart() {
  const p = produkte.find(x => x._id === produkt.value);
  cart.push({ ...p, anzahl: +anzahl.value });
  updateCart();
}

function updateCart() {
  let sum = 0;
  warenkorb.innerHTML = "";
  cart.forEach(c => {
    sum += c.preis * c.anzahl;
    warenkorb.innerHTML += `<li>${c.name} x${c.anzahl}</li>`;
  });

  const s = spieler.find(x => x._id === kunde.value);
  const r = RABATT[s?.karte || "Keine"];
  gesamt.textContent = (sum - sum * r / 100).toFixed(2);
}

function rechnung() {
  rechnungText.textContent =
    "Tankstelle Hamburg RP\n" +
    cart.map(c => `${c.name} x${c.anzahl}`).join("\n") +
    `\nEndbetrag: ${gesamt.textContent}€`;
}

