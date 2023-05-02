const redisClient = require("../helpers/redis");
const axios = require("axios");
const userCitiesList = require("../model/city.model");
///const API_KEY = process.env.OW_API_KEY;

const getCityData = async (req, res) => {

    try {


        const ip = req.body.ipgiven;


        const isCityInCache = await redisClient.get(`${city}`);

        console.log(isCityInCache)

        if (isCityInCache) return res.status(200).send({ data: isCityInCache });


        const response = await axios.get(`https://ipapi.co/${ip}/city/`)


        const citydata = response.data;


        console.log(citydata)

        redisClient.set(city, JSON.stringify(citydata), { EX: 30 * 60 });


        await userCitiesList.findOneAndUpdate({ userId: req.body.userId }, {
            userId: req.body.userId, $push: { previousSearches: city }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })


        return res.send({ data: citydata });

    } catch (err) {
        return res.status(500).send(err.messsage);
    }

}

module.exports={getCityData}