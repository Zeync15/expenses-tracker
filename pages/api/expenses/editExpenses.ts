import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("expenses_tracker");
    const id = req.query.id?.toString();
    const { item, price, date } = req.body;

    const post = await db.collection("expenses").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          item,
          price,
          date: new Date(date),
        },
      }
    );

    res.json(post);
  } catch (e) {
    console.error(e);
  }
};
