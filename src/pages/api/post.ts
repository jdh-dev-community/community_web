import { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(201).json({});
  // res.redirect(201, "/");
}
