const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static("."));

mongoose.connect(process.env.MONGO_URI);

// SCHEMAS
const Spieler = mongoose.model("Spieler", {
  name: String,
  karte: String
});

const Produkt = mongoose.model("Produkt", {
  name: String,
  preis: Number
});

const Mitarbeiter = mongoose.model("Mitarbeiter", {
  name: String,
  passwort: String
});

// LOGIN
app.post("/login", async (req, res) => {
  const user = await Mitarbeiter.findOne(req.body);
  user ? res.json({ ok: true }) : res.status(401).json({ ok: false });
});

// MITARBEITER (EINMAL)
app.post("/mitarbeiter", async (req, res) => {
  await Mitarbeiter.create(req.body);
  res.json({ ok: true });
});

// SPIELER
app.get("/spieler", async (_, res) => res.json(await Spieler.find()));
app.post("/spieler", async (req, res) => {
  await Spieler.create(req.body);
  res.json({ ok: true });
});
app.put("/spieler/:id", async (req, res) => {
  await Spieler.findByIdAndUpdate(req.params.id, req.body);
  res.json({ ok: true });
});
app.delete("/spieler/:id", async (req, res) => {
  await Spieler.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// PRODUKTE
app.get("/produkte", async (_, res) => res.json(await Produkt.find()));
app.post("/produkte", async (req, res) => {
  await Produkt.create(req.body);
  res.json({ ok: true });
});
app.put("/produkte/:id", async (req, res) => {
  await Produkt.findByIdAndUpdate(req.params.id, req.body);
  res.json({ ok: true });
});
app.delete("/produkte/:id", async (req, res) => {
  await Produkt.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000);
