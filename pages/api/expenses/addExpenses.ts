// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "@/lib/mongodb";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const client = await clientPromise;
    const db = client.db("expenses_tracker");

    const {item, price} = req.body;

    const expenses = await db.collection("expenses").insertOne({
      item,
      price
    });

    res.json(expenses);


  } catch (e) {
    console.error(e);
    throw new Error;
  }
};
