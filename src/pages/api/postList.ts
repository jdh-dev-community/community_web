import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { page, size } = req.query;

  try {
    const apiUrl = `http://3.36.204.107/api/v1/post/?page=${page}&size=${size}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("data :>> ", data);

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: JSON.stringify(error) });
  }
}
