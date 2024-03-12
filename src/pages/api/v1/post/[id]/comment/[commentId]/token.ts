import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "POST": {
      const tokenResponse = await fetch(
        `${process.env.NEXT_BASE_URI}${req.url}`,
        {
          method: req.method,
          body: req.body,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(tokenResponse.status).json(await tokenResponse.json());
    }

    default:
      break;
  }
}
