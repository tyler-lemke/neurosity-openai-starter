import OpenAI from "openai";
import "dotenv/config";
import open from "open";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function createChatResponse(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4o-mini",
  });

  console.log("ChatGPT Response:\n", completion.choices[0].message.content);
}

// Dall-e documentation https://platform.openai.com/docs/api-reference/images/create
export async function createImage(prompt) {
  const image = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "256x256",
    style: "vivid",
    quality: "standard",
  });
  // display image in terminal
  let url = image.data[0].url;
  //open url in browser
  open(url);
  console.log("See image here: ", image.data[0].url);
}
