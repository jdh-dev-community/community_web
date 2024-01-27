import { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch("http://3.36.204.107/api/v1/post", {
    method: req.method,
    body: req.body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("status", response.status);
  res.redirect(201, "/");
}
