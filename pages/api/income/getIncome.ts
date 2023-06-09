import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("expenses_tracker");

    const id = req.query.id?.toString();

    const singleIncome = await db.collection("income").findOne({
      _id: new ObjectId(id),
    });

    res.json(singleIncome);
  } catch (error) {
    console.error(error);
  }
};
