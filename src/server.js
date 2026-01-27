import express from "express";
import { config } from "dotenv";
import { initBot } from "./bot/bot.module.js";
import { connectDB } from "./db/config.js";
config();

const app = express();
initBot();
connectDB();

app.listen(process.env.PORT, () => console.log("Server is running.."));
