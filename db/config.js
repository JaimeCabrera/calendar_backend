const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("database conected");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la bd");
  }
};

module.exports = {
  dbConnection,
};
