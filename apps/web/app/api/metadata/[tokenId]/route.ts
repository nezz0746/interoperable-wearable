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
    image: "ipfs://bafkreifukc4gawybgl4736ltkwwoqoaxcl77r45yyf56u2qxu6xodutw2y",
    animation_url: `${protocol}://${url}/iframe/${tokenId}`,
  });
}
