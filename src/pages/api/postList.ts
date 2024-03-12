import { BASE_POST } from "@/types/api/postApi";
import { NextApiRequest, NextApiResponse } from "next";

export interface Board extends BASE_POST {
  onClick?: (id: number) => void;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Board[]>
) {
  const { page, size, sortBy } = req.query;

  try {
    const apiUrl = `${process.env.NEXT_BASE_URI}/api/v1/post/?page=${page}&size=${size}&sortBy=${sortBy}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
