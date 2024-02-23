import { CATEGORY } from "./constants";
import { BASE_COMMENT } from "./commentApi";
import { ORDER_BY, SORT_BY } from "./constants";

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

// 게시글 목록 요청
interface PostList_Request_QueryParams {
  page: number;
  size: number;
  sortBy: SORT_BY;
  orderBy: ORDER_BY;
}

// 게시글 목록 응답
interface PostList_Response {
  elementsCount: number;
  content: (BASE_POST & { commentCount: number })[];
}

// 게시글 상세 요청
interface PostDetail_Request_Path {
  id: number;
}

// 게시글 상세 응답
interface PostDetail_Response extends BASE_POST {
  comments: BASE_COMMENT[];
}

// 게시글 생성 요청
interface PostCreate_Request_Body {
  title: string;
  category: CATEGORY;
  creator: string;
  content: string;
  password: string;
}

// 게시글 생성 응답
interface PostCreate_Response {
  postId: number;
  title: string;
  content: string;
  category: string;
  creator: string;
  viewCount: number;
  commentCount: number;
  createdAt: string;
}
