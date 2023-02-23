const express = require("express");
const app = express.Router();
const Booking = require("./booking.model");

//This endpoint should allow the user to book flights.
app.post("/booking", async (req, res) => {
    const { user, flight } = req.body;
    try {

        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).send({ booking, msg: `${flight}has been Booked for user:${user}` })
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

//This point lists all the bookings so far with the user and flight details.

app.get("/dashboard", async (req, res) => {
    // const { userID, flightID } = req.body
    try {
        const users = await Booking.find().populate("user");
        const flights = await Booking.find().populate("flight");
        return res.status(200).send({ users, flights });
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


module.exports = app;