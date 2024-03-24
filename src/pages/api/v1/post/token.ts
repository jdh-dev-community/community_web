import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const response = await fetch(
    `${process.env.NEXT_BASE_URI}/api/v1/post/token`,
    {
      method: "POST",
      body: req.body,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  res.status(response.status).json(await response.json());
}
