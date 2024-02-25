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
      const reCommentResponse = await fetch(`http://3.36.204.107${req.url}`, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      res.status(reCommentResponse.status).json(await reCommentResponse.json());

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
        res.status(response.status).json({ success: true });
      } else {
        res.status(response.status).json({ success: false });
      }
      break;

    default:
      break;
  }
}
