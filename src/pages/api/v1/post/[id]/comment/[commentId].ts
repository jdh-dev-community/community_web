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
      const comments = await fetch(`http://3.36.204.107${req.url}`, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (comments.status === 200) {
        res.status(200).json(await comments.json());
      } else {
        res.status(comments.status).json({ success: false });
      }
      break;

    case "DELETE":
      const response = await fetch(`http://3.36.204.107${req.url}`, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization || "",
        },
      });

      if (response.status === 204) {
        res.status(200).json({ success: true });
      } else {
        res.status(response.status).json({ success: false });
      }
      break;

    default:
      break;
  }
}
