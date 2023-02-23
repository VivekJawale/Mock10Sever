const express = require("express");
const app = express.Router();
const Flight = require("./flight.model");

//his endpoint returns a list of all available flights.
app.get("/flights", async (req, res) => {
    try {
        const flight = await Flight.find();
        return res.status(200).send(flight);
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

//This endpoint returns the details of a specific flight identified by its ID.
app.get("/flights/:id", async (req, res) => {
    try {
        let flight = await Flight.findById({ _id: req.params.id });
        return res.status(200).send(flight);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})
//This endpoint allows users to add new flights to the system
app.post("/flights", async (req, res) => {
    try {
        let flight = new Flight(req.body);
        await flight.save();
        return res.status(201).send({ flight, msg: "Flight Created successfully" });
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

// This endpoint allows users to update the details of a specific flight identified by its ID.
app.put("/flights/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let flight = await Flight.findByIdAndUpdate({ _id: _id }, req.body);
        if (!flight) {
            return res.status(404).send({ msg: "Not Found" });
        } else {
            return res.status(204).send({ flight, msg: "Succcessfully Updated" })
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


//This endpoint allows users to delete a specific flight identified by its ID.

app.delete("/flights/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let flight = await Flight.findByIdAndDelete({ _id: _id });
        if (!flight) {
            return res.status(404).send({ msg: "Not Found" });
        } else {
            return res.status(202).send({ msg: "Succcessfully Deleted from Database" })
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

module.exports = app;
