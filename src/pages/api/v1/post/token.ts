import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "POST":
      const response = await fetch(`${process.env.NEXT_BASE_URI}${req.url}`, {
        method: "POST",
        body: req.body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      res.status(response.status).json(await response.json());
      break;

    default:
      break;
  }
}
