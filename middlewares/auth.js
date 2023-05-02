const jwt = require("jsonwebtoken");
const redisClient=require("../helpers/redis")

const authenticator=async (req,res,next)=>{
    try {
        const token=req.headers?.authorization?.split(" ")[1];

        if(!token) return res.status(401).send("Please login again");

        const isTokenValid=await jwt.verify(token,process.env.SECREAT_KEY);
        if(!isTokenValid)return res.send("authorization Failed")
        const isTokenBlackListed=await redisClient.get(token);
        if(isTokenBlackListed)return res.send("unauthorized")
        req.body.userId=isTokenValid.userId;
        req.body.preferred_ip=isTokenValid.preferred_ip;
        next()
    } catch (error) {
        res.send(error.message)
    }
}
 module.exports={authenticator}