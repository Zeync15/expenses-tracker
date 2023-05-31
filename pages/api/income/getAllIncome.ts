import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("expenses_tracker");

    const allIncome = await db
      .collection("income")
      .find({})
      .sort({ date: -1 })
      .limit(20)
      .toArray();

    res.json(allIncome);
  } catch (error) {
    console.error(error);
  }
};
