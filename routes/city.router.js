
const {Router } = require("express");
const { authenticator } = require("../middlewares/auth");
const { getCityData } = require("../controllers/city.controller");

const cityRouter = Router();

cityRouter.get("/city",authenticator,getCityData);

module.exports = cityRouter;