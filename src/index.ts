import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/RotaDesenvolvedor";
import cors from "cors"

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', "GET,HEAD,OPTIONS,POST,PUT,DELETE");
      return res.status(200).json({});
  }
  next();
});

app.use("/", routes);

app.use((req, res, next) => {
  const error = new Error("Não encontrado");
  return res.status(404).json({
    message: error.message,
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Rodando http://localhost:${port}/`);
});
