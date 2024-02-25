import { NextApiRequest, NextApiResponse } from "next";

export type Response = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  console.log("req", req.url);
  switch (req.method) {
    case "GET":
      // const comments = await requestComment(req);

      // console.log("comments.status", comments.status);

      // if (comments.status === 200) {
      //   res.status(200).json(await comments.json());
      // } else {
      // }
      break;

    case "POST":
      const response = await createComment(JSON.parse(req.body));

      if (response.status === 201) {
        res.status(200).json({ success: true });
      } else {
        res.status(response.status).json({ success: false });
      }
      break;
    default:
      break;
  }
}

const createComment = async (params: any) => {
  const { postId, ...body } = params;

  const response = await fetch(
    `http://3.36.204.107/api/v1/post/${postId}/comment`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

const requestComment = async (req: NextApiRequest) => {
  const { postId, page, size } = req.query;

  // console.log("postId",);
  // const response = await fetch(
  //   `http://3.36.204.107/api/v1/post/${postId}/comment?page=1&size=10&sortBy=recent&orderBy=desc`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  // return response;
};
