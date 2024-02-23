import { CATEGORY } from "./constants";

export interface PostDetail {
  postId: number;
  title: string;
  content: string;
  category: CATEGORY;
  creator: string;
  viewCount: number;
  comments: Comment[];
}

interface Comment {
  commentId: number;
  content: string;
  creator: string;
  createdAt: string;
  childrenCommentCount: number;
}
