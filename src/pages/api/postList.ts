import { NextApiRequest, NextApiResponse } from "next";

export type Board = {
  category: string;
  content: string;
  createdAt: null | Date;
  creator: string;
  postId: number;
  title: string;
  viewCount: number;
  onClick?: (id: number) => void;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Board[]>
) {
  const { page, size, sortBy } = req.query;

  try {
    const apiUrl = `http://3.36.204.107/api/v1/post/?page=${page}&size=${size}&sortBy=${sortBy}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
