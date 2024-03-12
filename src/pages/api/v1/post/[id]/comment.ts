import { NextApiRequest, NextApiResponse } from "next";

export type Response = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "GET":
      const comments = await fetch(`${process.env.NEXT_BASE_URI}${req.url}`, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (comments.status === 200) {
        res.status(200).json(await comments.json());
      } else {
      }
      break;

    case "POST":
      const response = await fetch(`${process.env.NEXT_BASE_URI}${req.url}`, {
        method: req.method,
        body: req.body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        res.status(200).json({ success: true });
      } else {
        res.status(response.status).json({ success: false });
      }
      break;

    default:
      break;
  }
}
