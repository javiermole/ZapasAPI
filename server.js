const express = require("express"); // Importa Express
const cors = require("cors"); // Permite conexiones desde otros dominios

const app = express();
app.use(cors()); // Habilita CORS para evitar problemas de acceso desde el frontend
app.use(express.json()); // Permite recibir datos en formato JSON

// Rutas CRUD

// ✅ GET: Obtener todas las zapatillas
app.get("/zapatillas", (req, res) => res.json(zapatillas));

// ✅ GET: Obtener una zapatilla por ID
app.get("/zapatillas/:id", (req, res) => {
  const zapatilla = zapatillas.find(p => p.id == req.params.id);
  if (!zapatilla) return res.status(404).json({ error: "No encontrada" });
  res.json(zapatilla);
});

// ✅ GET: Buscar zapatillas por marca
app.get("/zapatillas/marca/:marca", (req, res) => {
  const resultado = zapatillas.filter(p => p.marca.toLowerCase() === req.params.marca.toLowerCase());
  if (resultado.length === 0) return res.status(404).json({ error: "No se encontraron zapatillas de esa marca" });
  res.json(resultado);
});

// ✅ POST: Agregar una zapatilla
app.post("/zapatillas", (req, res) => {
  const nuevaZapatilla = { id: zapatillas.length + 1, ...req.body };
  zapatillas.push(nuevaZapatilla);
  res.status(201).json(nuevaZapatilla);
});

// ✅ PUT: Modificar una zapatilla
app.put("/zapatillas/:id", (req, res) => {
  const index = zapatillas.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "No encontrada" });
  zapatillas[index] = { id: Number(req.params.id), ...req.body };
  res.json(zapatillas[index]);
});

// ✅ DELETE: Eliminar una zapatilla
app.delete("/zapatillas/:id", (req, res) => {
  const index = zapatillas.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "No encontrada" });
  zapatillas.splice(index, 1);
  res.json({ mensaje: "Eliminada correctamente" });
});

// Levantar servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
