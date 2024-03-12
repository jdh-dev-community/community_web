import { useToast } from "@/components/ui/use-toast";
import { INACTIVE, invalidPassword } from "@/constants";
import { BASE_COMMENT } from "@/types/api/commentApi";
import { getParamsFromFormData } from "@/utils/common";
import { findIndex, mapValues } from "lodash";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export const useCommentManager = (
  data: any,
  setOpenDeletePopup: Dispatch<SetStateAction<boolean>>
) => {
  const [comments, setComments] = useState<{
    elementsCount: number;
    content: BASE_COMMENT[];
  }>(data.comments);
  const [reCommentList, setReCommentList] = useState<{
    [key: string]: { elementsCount: number; content: BASE_COMMENT[] };
  }>({});

  const [openReCommentForm, setOpenReCommentForm] = useState<{
    [key: string]: boolean;
  }>({});

  const [isVisibleReComment, setVisibleReComment] = useState<{
    [key: string]: boolean;
  }>({});

  const commentId = useRef<number | null>(null);
  const commentNumber = useRef<number>(1);
  const reCommentPage = useRef<{
    [key: string]: number;
  }>({});
  const pageSize = useRef<number>(10);

  const { toast } = useToast();

  useEffect(() => {
    setComments(data.comments);
    setReCommentList({});
    setOpenReCommentForm({});
    setVisibleReComment({});
    commentId.current = null;
    commentNumber.current = 1;
    reCommentPage.current = {};
  }, [data]);

  const getCommentList = async () => {
    commentNumber.current = commentNumber.current + 1;
    const response = await fetch(
      `/api/v1/post/${data.postId}/comment?page=${commentNumber.current}&size=${pageSize.current}`,
      {
        method: "GET",
      }
    );

    const currentComments = await response.json();

    setComments((prev) => {
      if (commentNumber.current === 1) {
        return currentComments;
      }

      return {
        elementsCount: currentComments.elementsCount,
        content: [...(prev?.content ?? []), ...currentComments.content],
      };
    });
  };

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    const requestParams = getParamsFromFormData(new FormData(e.currentTarget));

    const res = await fetch(`/api/v1/post/${data.postId}/comment`, {
      method: "POST",
      body: JSON.stringify({
        ...requestParams,
        parentId: commentId.current,
      }),
    });

    const { success } = await res.json();

    if (success) {
      if (commentId.current) {
        reCommentPage.current = {
          ...reCommentPage.current,
          [commentId.current]: 1,
        };

        await getReComment(commentId.current);
      } else {
        commentNumber.current = 0;
        await getCommentList();
      }
    }

    e.target.reset();
  };

  const setCommentId = (id: number | null) => {
    commentId.current = id;
  };

  const getReComment = async (commentId: number) => {
    const page = reCommentPage.current[commentId] ?? 1;
    const response = await fetch(
      `/api/v1/post/${data.postId}/comment/${commentId}?page=${page}&size=${pageSize.current}`
    );

    const reComment = await response.json();

    reCommentPage.current = {
      ...reCommentPage.current,
      [commentId]: (reCommentPage.current[commentId] ?? 1) + 1,
    };

    setReCommentList((prev) => {
      if (prev[commentId] === undefined || page === 1) {
        return { ...prev, [commentId]: reComment };
      }

      return {
        ...prev,
        [commentId]: {
          content: [...prev[commentId].content, ...reComment.content],
          elementsCount: reComment.elementsCount,
        },
      };
    });
  };

  const handleReCommentForm = (commentId: number) => {
    setOpenReCommentForm((prev) => {
      if (prev[commentId]) {
        return { ...prev, [commentId]: !prev[commentId] };
      }

      return { ...prev, [commentId]: true };
    });
  };

  const handleVisibleReComment = (commentId: number) => {
    setVisibleReComment((prev) => {
      if (prev[commentId]) {
        return { ...prev, [commentId]: !prev[commentId] };
      }

      return { ...prev, [commentId]: true };
    });
  };

  const handleCommentRemove = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = getParamsFromFormData(new FormData(e.currentTarget));

    const response = await fetch(
      `/api/v1/post/${data.postId}/comment/${commentId.current}/token`,
      {
        method: "POST",
        body: JSON.stringify({ password: params.password }),
      }
    );

    if (response.status === 200) {
      const { token } = await response.json();

      const res = await fetch(
        `/api/v1/post/${data.postId}/comment/${commentId.current}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { success } = await res.json();
      if (success) {
        updateCommentList();
        setOpenDeletePopup(false);
      } else {
        alert("삭제를 하지 못했습니다.");
      }
    } else {
      alert(invalidPassword);
    }

    return;
  };

  const updateCommentList = () => {
    const isComment =
      findIndex(
        comments.content,
        (value) => value.commentId === commentId.current
      ) > 0;

    if (isComment) {
      setComments((prev) => ({
        ...prev,
        content: prev.content.map((value) => {
          if (value.commentId === commentId.current) {
            return { ...value, status: INACTIVE };
          }
          return value;
        }),
      }));
    } else {
      setReCommentList((prev) => {
        return mapValues(prev, (item) => ({
          ...item,
          content: item.content.map((value) => {
            if (value.commentId === commentId.current) {
              return { ...value, status: INACTIVE };
            }
            return value;
          }),
        }));
      });
    }
  };

  return {
    comments,
    reCommentList,
    openReCommentForm,
    isVisibleReComment,
    setCommentId,
    handleCommentSubmit,
    getReComment,
    getCommentList,
    handleVisibleReComment,
    handleReCommentForm,
    handleCommentRemove,
  };
};
