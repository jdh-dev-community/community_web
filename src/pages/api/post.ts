import { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await createPost(req.body);

    console.log("response", response);
    // res.redirect(307, `/post/${id}`);
  } catch (err) {
    console.log("err", err);

    throw new Error("Failed to submit the data. Please try again.");
  }
}

const createPost = async (body: any) => {
  const response = await fetch("http://3.36.204.107/api/v1/post", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
