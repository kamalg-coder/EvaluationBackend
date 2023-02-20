const express =require("express");
const { connection } = require("./config/db");

const cors=require('cors')
const { postRouter } = require("./routes/post.routes.js");
const { userRouter } = require("./routes/User.routes.js");
const { authenticate } = require("./middleware/Authenticate.middleware.js");


const app =express()

app.use(express.json());
app.use(cors())



app.use("/users",userRouter)


app.use("/posts", authenticate,postRouter)

app.listen(7500,async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(" Cannot Connected to DB");  
        console.log(error);
    }
    console.log("Running the server at port 7500");
})