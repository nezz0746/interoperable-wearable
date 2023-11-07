import fs from "fs/promises";
import { Web3Storage, getFilesFromPath, File } from "web3.storage";
import OpenAI from "openai";
import "dotenv/config";

const WEB3_STORAGE_TOKEN = process.env.WEB3_STORAGE_TOKEN;
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

if (!WEB3_STORAGE_TOKEN) {
  throw new Error("Missing WEB3_STORAGE_TOKEN");
}

if (!OPEN_AI_API_KEY) {
  throw new Error("Missing OPEN_AI_API_KEY");
}

const client = new Web3Storage({ token: WEB3_STORAGE_TOKEN });

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

const main = async () => {
  const items_dir = (await fs.readdir("./items")).filter(
    // Does not include openai
    (item) => !item.includes("openai")
  );

  const cids: Record<string, string> = {};

  for (let i = 0; i < items_dir.length; i++) {
    const name = items_dir[i].split(".")[0];
    const image = await getFilesFromPath(`./items/${items_dir[i]}`);
    const image_cid = await client.put(image, { wrapWithDirectory: false });

    const metadata = {
      name,
      description: JSON.parse(
        await fs.readFile(`./items/openai_${name.toLowerCase()}.json`, "utf-8")
      ).content.replace(`\"`, ""),
      image: `ipfs://${image_cid}`,
    };

    const metadata_cid = await client.put(
      [new File([JSON.stringify(metadata)], "metadata.json")],
      { wrapWithDirectory: false }
    );

    cids[name] = metadata_cid;
  }

  await fs.writeFile("./items-metadata.json", JSON.stringify(cids));
};

main();
