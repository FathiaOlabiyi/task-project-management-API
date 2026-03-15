const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const connection = async() => {
    mongoose.connect(MONGODB_URI)

    mongoose.connection.on("connected", () => {
        console.log("Connection to database successful")
    });

    mongoose.connection.on("error", () => {
        console.log("Error connecting to database")
    })
};

module.exports = {connection};