require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./src/congif/db");
const PORT = process.env.PORT || 8080;
const userrouter = require("./src/features/user/user.route")
const flightrouter = require("./src/features/flight/flight.route")
const bookingrouter = require("./src/features/Booking/booking.route")
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", userrouter) // for user authentication like Login Signup
app.use("/api", flightrouter) // for flight info  ,adding new flights update and delete flights
app.use("/api", bookingrouter)
app.get("/", async (req, res) => {
    res.send("Hello")
})


app.listen(PORT, async (req, res) => {
    try {
        await connect();
        console.log(`http://localhost:${PORT}`)
    } catch (error) {
        res.send(error.message)
    }
})