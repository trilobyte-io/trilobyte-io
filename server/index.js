import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import getTempHumidity from "./controllers/getTempHumidity.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static("src/dist"));
app.use(cors());

app.get("/tempHumidity", getTempHumidity);

app.post("/postSensorData", (req, res) => {
  console.log(req.body)
});

app.get("/*", (_req, res) => {
  console.log("PINGED? IN SERVER INDEX")
  res.sendFile(path.join(__dirname, "../src/dist/index.html"));
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
