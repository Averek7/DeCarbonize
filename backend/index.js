const express = require("express");
const cors = require("cors");
const akave = require("./akave"); // Correct import for CommonJS modules
const connectToMongo = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/user");
const vehicleRoutes = require("./routes/vehicle");
const akaveRoutes = require("./routes/akave");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongo();

app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/akave", akaveRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
