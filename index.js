import express from "express";
import pool from './config/conexion.js'
import usersRoutes from "./src/routes/users.routes.js";
import productsRoutes from "./src/routes/products.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());


app.use(usersRoutes);
app.use(productsRoutes);

app.get("/", (req, res) => {
  res.send("API Rest ful");
});

app.use((req,res)=>{
res.status(404).send("pagina inexistente")
})

app.listen(PORT, () => {
  console.log(`servidor de piola en http://localhost:${PORT}`);
});
