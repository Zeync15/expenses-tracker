// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const expenses = await db
      .collection("ratings")
      .find({})
      .sort({ createdAt: 1 })
      .limit(10)
      .toArray();

    res.json(expenses);
  } catch (e) {
    console.error(e);
  }
}
