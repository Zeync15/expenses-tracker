import clientPromise from "@/lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("expenses_tracker");

    const allExpenses = await db.collection("expenses")
      .find({})
      .sort({createdAt: 1})
      .limit(20)
      .toArray();

    res.json(allExpenses);
  } catch (error) {
    console.error(error);
  }
};