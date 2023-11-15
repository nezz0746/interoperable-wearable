import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { tokenId: string };
};

const url =
  process.env.NODE_ENV === "development"
    ? "localhost:3001"
    : process.env.VERCEL_URL;

const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

export async function GET(req: NextRequest, { params: { tokenId } }: Params) {
  return NextResponse.json({
    name: "Gaian Wearable Pack #" + tokenId,
    description: "Gaian Pack: Includes 5 wearable.",
    image: "ipfs://bafkreig7wuoesv6a5pas27skxzg2i572pteox2scpn5qrgr5wzxsdofdya",
    animation_url: `${protocol}://${url}/iframe/${tokenId}`,
  });
}
