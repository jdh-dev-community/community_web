import { NextApiRequest, NextApiResponse } from "next";

export type BoardList = {
  category: string;
  content: string;
  createdAt: null | Date;
  creator: string;
  postId: number;
  title: string;
  viewCount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BoardList[]>
) {
  const { page, size } = req.query;

  try {
    const apiUrl = `http://3.36.204.107/api/v1/post/?page=${page}&size=${size}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
