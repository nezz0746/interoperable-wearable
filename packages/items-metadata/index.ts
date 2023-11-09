import fs from "fs/promises";
import { Web3Storage, getFilesFromPath, File } from "web3.storage";
import "dotenv/config";

const WEB3_STORAGE_TOKEN = process.env.WEB3_STORAGE_TOKEN;

if (!WEB3_STORAGE_TOKEN) {
  throw new Error("Missing WEB3_STORAGE_TOKEN");
}

const client = new Web3Storage({ token: WEB3_STORAGE_TOKEN });

const main = async () => {
  const items_dir = (await fs.readdir("./items/gaian")).filter(
    // Does not include openai
    (item) => !item.includes("openai")
  );

  const cids: Record<string, string> = {};

  for (let i = 0; i < items_dir.length; i++) {
    const name = items_dir[i].split(".")[0];
    const image = await getFilesFromPath(`./items/gaian/${items_dir[i]}`);
    const image_cid = await client.put(image, { wrapWithDirectory: false });

    const metadata = {
      name,
      description: name.includes("Pack")
        ? `Gaian Pack: Includes ${items_dir.length - 1} wearable.`
        : `Gaian Wearable: ${name.split("-")[1].trim()}`,
      image: `ipfs://${image_cid}`,
    };

    console.log(metadata);

    const metadata_cid = await client.put(
      [new File([JSON.stringify(metadata)], "metadata.json")],
      { wrapWithDirectory: false }
    );

    cids[name] = metadata_cid;
  }

  await fs.writeFile("./metadata/gaian.json", JSON.stringify(cids));
};

main();
