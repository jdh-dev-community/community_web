import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case "GET":
      const post = await fetch(`${process.env.NEXT_BASE_URI}${req.url}`);

      res.status(200).json(await post.json());
      break;
    case "PUT":
      const { postId, creator, ...body } = JSON.parse(req.body);

      const response = await fetch(`${process.env.NEXT_BASE_URI}${req.url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization || "",
        },
        body: JSON.stringify(body),
      });

      res.status(response.status).json(await response.json());

      break;
    case "DELETE":
      try {
        const response = await fetch(`${process.env.NEXT_BASE_URI}${req.url}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.authorization ?? "",
          },
        });

        console.log("response", response.status);
      } catch (err) {
        console.log("err", err);
      }

      res.status(200).json({ success: true });
      break;
    default:
      break;
  }
}
