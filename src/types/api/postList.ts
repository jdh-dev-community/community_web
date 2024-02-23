import { CATEGORY } from "./constants";

export interface PostList {
  elementsCount: number;
  content: Post[];
}

interface Post {
  postId: number;
  title: string;
  content: string;
  category: CATEGORY;
  creator: string;
  viewCount: number;
  commentCount: number;
  createdAt: string;
}
