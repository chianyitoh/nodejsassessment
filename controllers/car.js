const Car = require('../models/Car');
const { failedResponse } = require('../utils/response');

const getCarList = async (req, res) => {
    try {
        const { carname = '', pageindex, pagesize, timestamp } = req.query;

        if (!pageindex || !pagesize || !timestamp) {
            return failedResponse(res);
        }

        const page = parseInt(pageindex);
        const size = parseInt(pagesize);

        const filter = {};

        if (carname && carname.trim() !== '') {
            filter.carname = { $regex: carname, $options: 'i' };
        }

        const totalcount = await Car.countDocuments(filter);

        const cars = await Car.find(filter)
            .skip((page - 1) * size)
            .limit(size);

        return res.status(200).json({
            list: cars,
            totalcount
        });

    } catch (error) {
        console.log(error);
        return failedResponse(res);
    }
};

module.exports = { getCarList };