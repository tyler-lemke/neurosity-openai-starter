import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function createChatResponse(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
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

  console.log(image.data);
}

// createChatResponse("I am lacking focus and motivation. Cheer me on.");
// createImage("A man biting a lemon");
