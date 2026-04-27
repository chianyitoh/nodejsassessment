const mongoose = require('mongoose');

const VarianceSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number
});

const CarSchema = new mongoose.Schema({
    carname: String,
    brand: String,
    description: String,
    variance: [VarianceSchema]
});

module.exports = mongoose.model('Car', CarSchema);