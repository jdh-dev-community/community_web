import { ORDER_BY, SORT_BY } from "./constants";

export interface BASE_COMMENT {
  commentId: number;
  content: string;
  creator: string;
  createdAt: string;
  postId: number;
  childrenCommentCount: number;
  status: string;
}

// 댓글 생성 요청
interface CommentCreate_Request_Body {
  content: string;
  creator: string;
  password: string;
  parentId?: number | null;
}

// 댓글 생성 응답
type CommentCreate_Response = BASE_COMMENT;

// 댓글 목록 조회 요청
interface CommentList_Request_QueryParams {
  page: number;
  size: number;
  sortBy: SORT_BY;
  orderBy: ORDER_BY;
}

// 댓글 목록 조회 응답
type CommentList_Response = BASE_COMMENT[];

// 대댓글 목록 조회 요청
interface ChildrenCommentList_Request_QueryParams {
  page: number;
  size: number;
  sortBy: SORT_BY;
  orderBy: ORDER_BY;
}

// 대댓글 목록 조회 응답
type ChildrenCommentList_Response = BASE_COMMENT[];
