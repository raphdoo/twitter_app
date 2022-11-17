const mongoose = require('mongoose');
const config = require("./config")

const connect = (url) => {
    mongoose.connect(url || config.mongoUrl)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = {
    connect
};