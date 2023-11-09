/**
 * EXPERIMENTAL: This script is used to generate the metadata for the items.
 */
import OpenAI from "openai";
import fs from "fs/promises";

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

if (!OPEN_AI_API_KEY) {
  throw new Error("Missing OPEN_AI_API_KEY");
}

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});

const writePromptsToFile = async (name: string) => {
  const prompt =
    "An interoperable nft image which name is: " +
    name +
    ". It includes the metaverse project it belongs to. Create a fictitious description base on what it looks like.";

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  await fs.writeFile(
    `./items/openai_${name.toLowerCase()}.json`,
    JSON.stringify(response.choices[0].message, null, 2)
  );
};
