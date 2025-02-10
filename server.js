const express = require("express");
const SneaksAPI = require("sneaks-api");
const cors = require("cors");

const app = express();
const sneaks = new SneaksAPI();

app.use(cors());

// 1 Obtener información de una zapatilla por su ID
app.get('/id/:id', (req, res) => {
    sneaks.findOne(req.params.id, (error, shoe) => {
        if (error) {
            res.status(404).json({ error: "Product Not Found" });
        } else {
            res.json(shoe);
        }
    });
});

// 2 Obtener precios de una zapatilla específica
app.get('/id/:id/prices', (req, res) => {
    sneaks.getProductPrices(req.params.id.toUpperCase(), (error, prices) => {
        if (error) {
            res.status(404).json({ error: "Product Not Found" });
        } else {
            res.json(prices);
        }
    });
});

// 3 Obtener las zapatillas más populares
app.get('/home', (req, res) => {
    const count = req.query.count || 40; // Si no hay parámetro, devuelve 40 resultados
    sneaks.getMostPopular(count, (error, products) => {
        if (error) {
            res.status(500).json({ error: "Error fetching popular products" });
        } else {
            res.json(products);
        }
    });
});

// 4 Buscar zapatillas por palabra clave
app.get('/search/:shoe', (req, res) => {
    const count = req.query.count || 40;
    sneaks.getProducts(req.params.shoe, count, (error, products) => {
        if (error) {
            res.status(500).json({ error: "Error fetching products" });
        } else {
            res.json(products);
        }
    });
});


app.get('/shoes2', function(req, res){
    sneaks.findAll( function(error, products){
        if (error) {
            console.log(error)
            res.send("No Products In Database");
          } else {
            res.json(products);
          }
    })
});
// 5 Obtener todas las zapatillas en la base de datos
app.get('/shoes', (req, res) => {
    sneaks.findAll((error, products) => {
        if (error) {
            res.status(500).json({ error: "No Products In Database" });
        } else {
            res.json(products);
        }
    });
});

// 6 Redirección de la ruta raíz a /home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Levantar servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
