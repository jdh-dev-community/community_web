import { NextApiRequest, NextApiResponse } from "next";

export type Response = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const response = await createComment(JSON.parse(req.body));

  if (response.status === 201) {
    res.status(200).json({ success: true });
  } else {
    res.status(response.status).json({ success: false });
  }
}

const createComment = async (params: any) => {
  const { postId, ...body } = params;

  const response = await fetch(
    `http://3.36.204.107/api/v1/post/${postId}/comment`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
