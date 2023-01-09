import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAiApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: ProcessingInstruction.env.OPENAI_API_KEY,
});

const openai = new OpenAiApi(configuration);
const app = express();
app.arguments(cors());
app.arguments(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Noxus",
  });
});

app.post();
