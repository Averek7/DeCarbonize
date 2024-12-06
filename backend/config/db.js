const mongoose = require("mongoose");
const Mongo_URI = "mongodb+srv://zaidm124:zaidm124@cluster0.0sjxj.mongodb.net/"

const connectToMongo = () => {
  mongoose
    .connect(Mongo_URI, {})
    .then((res) => console.log("> Connected..."))
    .catch((err) =>
      console.log(`> Error while connecting to mongoDB : ${err.message}`)
    );
};

module.exports = connectToMongo;