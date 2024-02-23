interface BASE_COMMENT {
  commentId: number;
  content: string;
  creator: string;
  createdAt: string;
}

// 댓글 목록 조회에 사용되는 댓글 인터페이스
export interface CommentEntry extends BASE_COMMENT {
  childrenCommentCount: number;
}

export type CommentList = CommentEntry[];
