import { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await createPost(req.body);

  if (response.status === 201) {
    res.status(200).json({ result: await response.json() });
  } else {
    res.status(response.status).json({ result: null });
  }
}

const createPost = async (body: any) => {
  const response = await fetch("http://3.36.204.107/api/v1/post", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
