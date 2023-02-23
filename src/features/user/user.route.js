const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express.Router();
const User = require("./user.model");
const SCECRET_KEY = "12345";


//This endpoint allows users to register.
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.send({
                status: 0,
                message: "User already Exists",
            });
        } else {
            let pass = await bcrypt.hash(password, 10);
            let user = await User.create({
                ...req.body,
                password: pass,
            });
            return res
                .status(201)
                .send({ user, message: "User created Successfully" });
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});
// This endpoint allow users to login.
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            let pass = await bcrypt.compare(password, user.password);
            if (!pass) {
                return res.send("incorrect password");
            } else {
                let token = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                    },
                    SCECRET_KEY
                );
                return res.send({ user, message: "Login Successfully" });
            }
        } else {
            return res.send("Ask Admin to create the role");
        }
    } catch (error) {
        return res.send(error.message);
    }
});




module.exports = app;
