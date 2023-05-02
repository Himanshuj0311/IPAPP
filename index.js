const express=require("express");
const connection=require("./config/db")
const {userRouter}=require("./routes/user.router")
const redisClient=require("./helpers/redis")
const logger = require("./middlewares/logger");
const cityRouter = require("./routes/city.router");


require("dotenv").config()
const PORT=process.env.PORT||7000
const app=express();
app.use(express.json());
app.get("/", async(req,res)=>{
    res.send(await redisClient.get("name"));
})
app.use("/users",userRouter)

app.use("/api/ip",cityRouter);



app.listen(PORT, async ()=>{
    try{
     await connection();
     console.log("connected to db")
     logger.log("info","Database connected")
    } catch(err) {
      console.log(err.message)
      logger.log("error","Database connection fail")
    }
console.log("server is running",PORT)
})