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

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 1,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

app.listen(5000, () =>
  console.log("server is running on http://localhost:5000")
);
