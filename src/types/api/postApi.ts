import { CATEGORY } from "./constants";
import { CommentEntry } from "./commentApi";

// 게시글 필수 속성 인터페이스
interface BASE_POST {
  postId: number;
  title: string;
  content: string;
  category: CATEGORY;
  creator: string;
  viewCount: number;
  createdAt: string;
}

// 게시글 목록
export interface PostList {
  elementsCount: number;
  content: (BASE_POST & { commentCount: number })[];
}

// 게시글 상세
export interface PostDetail extends BASE_POST {
  comments: CommentEntry[];
}
