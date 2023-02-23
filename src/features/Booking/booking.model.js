const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        flight: { type: mongoose.Schema.Types.ObjectId, ref: 'flight' }
    },
    {
        versionKey: false,
        timestamps: true,
    });

module.exports = Booking = mongoose.model("Booking", bookingSchema)