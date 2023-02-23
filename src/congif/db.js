const mongoose = require('mongoose');
module.exports = connect = async () => {
    return mongoose.connect(process.env.URL)
}