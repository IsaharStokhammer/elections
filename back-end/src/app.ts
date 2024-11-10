import { log } from "console";
import express from "express";
import connectDB from "./DBConfig"
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT;
connectDB()

log(PORT)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
