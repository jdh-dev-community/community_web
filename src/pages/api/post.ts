import { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await fetch("http://3.36.204.107/post", {
    method: req.method,
    body: req.body,
  });

  res.status(201).json({});
  // res.redirect(201, "/");
}
