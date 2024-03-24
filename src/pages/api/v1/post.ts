import { BASE_POST } from "@/types/api/postApi";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export interface Board extends BASE_POST {
  onClick?: (id: number) => void;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      try {
        const apiUrl = `${process.env.NEXT_BASE_URI}${req.url}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.status(200).json(data);
      } catch (error) {
        console.log(error);
      }
      break;

    case "POST":
      const response = await fetch(`${process.env.NEXT_BASE_URI}${req.url}`, {
        method: "POST",
        body: req.body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        res.status(200).json({ result: await response.json() });
      } else {
        res.status(response.status).json({ result: null });
      }

      break;

    default:
      break;
  }
}
