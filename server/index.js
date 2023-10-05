import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
import { WebSocketServer } from 'ws';
import getAllData from "./controllers/getAllData.js";
import postSensorData from "./controllers/postSensorData.js";
import postRealTimeData from "./controllers/postRealTimeData.js";

const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static("src/dist"));
app.use(cors());


// WebSocket connection handling
wss.on('connection', () => {
  console.log('WebSocket connection established');
});




app.get("/allData", getAllData);

app.post("/postSensorData", postSensorData);



app.post("/postRealTimeData", (req, res) => {
  const message = req.body.hey
  wss.clients.forEach((client) => {
      client.send(JSON.stringify(message));
  });
  res.status(200).json("POST request handled successfully").end();
})

// app.post("/postRealTimeData", postRealTimeData);

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../src/dist/index.html"));
});

server.listen(3001, () => {
  console.log('WebSocket Server is listening on port 3001');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});