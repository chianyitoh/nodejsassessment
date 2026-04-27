// To insert Car data into Mongoose DB 
// Command:
// node seed/carSeed.js

const mongoose = require('mongoose');
const Car = require('../models/Car');
require('dotenv').config();

const connectDB = require('../db/connect');

const seedCars = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        await Car.insertMany([
            {
                carname: "3 MPS",
                brand: "Mazda",
                description: "High performance hatchback with turbocharged engine",
                variance: [
                    { id: "1", name: "Full Spec", price: 175000 },
                    { id: "2", name: "Manual Spec", price: 105000 }
                ]
            },
            {
                carname: "RS 250 Cup",
                brand: "Renault",
                description: "Sport tuned compact race-inspired hatchback",
                variance: [
                    { id: "1", name: "Full Spec", price: 1375000 },
                    { id: "2", name: "Manual Spec", price: 1105000 }
                ]
            },
            {
                carname: "Civic Type R",
                brand: "Honda",
                description: "Iconic performance car with aggressive styling",
                variance: [
                    { id: "1", name: "Full Spec", price: 320000 },
                    { id: "2", name: "Manual Spec", price: 280000 }
                ]
            },
            {
                carname: "Model 3",
                brand: "Tesla",
                description: "Electric sedan with autopilot and long range",
                variance: [
                    { id: "1", name: "Standard Range", price: 210000 },
                    { id: "2", name: "Long Range", price: 280000 }
                ]
            },
            {
                carname: "A45 AMG",
                brand: "Mercedes-Benz",
                description: "Luxury hot hatch with extreme performance",
                variance: [
                    { id: "1", name: "Full Spec", price: 420000 },
                    { id: "2", name: "Performance Pack", price: 480000 }
                ]
            }
        ]);

        console.log("Cars seeded successfully");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedCars();