import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      break;
    case "DELETE":
      await removePost(
        req.query.id as string,
        req.headers.authorization as string
      );
      res.status(200).json({});
      break;
    default:
      break;
  }
}

const removePost = async (postId: string, authorization: string) => {
  try {
    const response = await fetch(`http://3.36.204.107/api/v1/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    });

    console.log("response", response.status);
  } catch (err) {
    console.log("err", err);
  }
};
