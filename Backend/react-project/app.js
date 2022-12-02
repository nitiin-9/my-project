const express = require("express");
const placesRoutes = require("./routes/places-routes");
const HttpError = require("./models/http-error");
const usersRoutes = require("./routes/users-routes");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require('fs');
const path = require('path')

const bodyParser = require("body-parser");
const app = express();
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};


app.use(bodyParser.json());
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);
app.use("/uploads/images", express.static(path.join('uploads', 'images')));
app.use((req, res, next) => {
    const error = new HttpError(" Could not foun route", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured" });
});
mongoose
    .connect(
        "mongodb+srv://abc:abc@cluster0.s3fas3u.mongodb.net/mern?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });