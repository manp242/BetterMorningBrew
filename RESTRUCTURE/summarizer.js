import dotenv from "dotenv";
import { error } from "selenium-webdriver";
dotenv.config();

const apiKey = process.env.SAPI_KEY;
const AWANLLM_API_KEY = apiKey;

// let check = async function (paragraph) {};
export default async function summarizer(paragraph) {
  let res = await fetch("https://api.awanllm.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AWANLLM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "Meta-Llama-3.1-8B-Instruct",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Hi, Please summarize the following paragraph make the summary atleast 3-4 senteneces : \n\n${paragraph}. MAKE SURE TO NOT INCLUDE SHIT LIKE heres a summary`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
      stream: false,
    }),
  });
  let response = await res.json();
  if (res.ok) {
    return response.choices[0].message.content;
  }
}
