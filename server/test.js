const mongoose = require("mongoose");

const uri = "mongodb+srv://codervoder123_db_user:<5uJB1Ef61ltT4CgR>@cluster0.h887c3k.mongodb.net/?appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });