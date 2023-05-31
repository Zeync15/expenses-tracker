// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("expenses_tracker");

    const { item, price, date, category } = req.body;

    const income = await db.collection("income").insertOne({
      item,
      price: parseFloat(price).toFixed(2),
      date: new Date(date),
      category,
      createdDate: new Date(Date.now()),
    });

    res.json(income);
  } catch (e) {
    console.error(e);
    throw new Error();
  }
};
