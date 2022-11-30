const express = require("express");
const server = express();

const imagesController = require("./controllers/images-controller");

const errorHandler = require("./errors/error-handler");

const cors = require('cors');

const PORT = 3001;

server.use(cors());

server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.use(express.json());

server.use("/images", imagesController);
server.use(errorHandler);

server.listen(process.env.PORT || PORT, () => console.log(`Listening on ${PORT}`));