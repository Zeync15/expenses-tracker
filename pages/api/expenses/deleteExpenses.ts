import clientPromise from "@/lib/mongodb";
import {ObjectId} from "mongodb";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("posts");
    const id = req.query.id?.[0];

    const post = await db.collection("posts").deleteOne({
      _id: new ObjectId(id),
    });

    res.json(post);
  } catch (e) {
    console.error(e);
  }
};