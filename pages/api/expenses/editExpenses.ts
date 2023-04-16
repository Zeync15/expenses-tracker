import {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "@/lib/mongodb";
import {ObjectId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("posts");
    const id = req.query.id?.[ 0 ];
    const {title, content} = req.body;

    const post = await db.collection("posts").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );

    res.json(post);
  } catch (e) {
    console.error(e);
  }
};