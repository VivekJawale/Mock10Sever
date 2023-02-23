const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
module.exports = connect = async () => {
    return mongoose.connect(process.env.URL)
}