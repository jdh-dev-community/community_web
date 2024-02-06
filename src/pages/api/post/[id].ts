import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "PUT":
      const status = await updatePost(req);

      if (status === 200) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false });
      }

      break;
    case "DELETE":
      await removePost(
        req.query.id as string,
        req.headers.authorization as string
      );

      res.status(200).json({ success: true });
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

const updatePost = async (req: NextApiRequest) => {
  const { postId, ...body } = JSON.parse(req.body);

  const response = await fetch(`http://3.36.204.107/api/v1/post/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.authorization || "",
    },
    body: JSON.stringify(body),
  });

  return response.status;
};
