import clientPromise from "./mongodb";

export const getRatings = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const result = await db.collection("ratings")
      .find({})
      .sort({ createdAt: 1 })
      .limit(10)
      .toArray();

    console.log('re', result);

    return {
      props: { result: JSON.parse(JSON.stringify(result)) },
    };
  } catch (e) {
    console.error(e);
  }
}