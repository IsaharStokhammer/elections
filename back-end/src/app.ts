import { log } from "console";
import express from "express";
import connectDB from "./DBConfig"
import dotenv from "dotenv";
import createCandidates from "./isert4candidates";
import router from "./routes/routes";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
connectDB()
app.use("/",router)
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// createCandidates()

export default app;
