import dotenv from "dotenv";

import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectDB()
.then(()=>
{
    app.listen(process.env.PORT || 8000 ,   ()=>
    {
        console.log(`Server is running on port ${process.env.PORT}`);
    })})
.catch((err)=>
{
    console.log("Mongo DB connection failed ",err);
    process.exit(1);
})

// import express from "express";

// const app = express()

// (async () =>
// {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>
//         {
//             console.log("Application not able to talk to databse");
//             throw error
//         })
//         console.log('Database connected')
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// })()
