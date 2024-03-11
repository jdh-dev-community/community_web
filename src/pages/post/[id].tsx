import { PostDetailComponent } from "@/components/postDetail/PostDetail";
import { PostDetail_Response } from "@/types/api/postApi";

export default function PostDetail({ data }: { data: PostDetail_Response }) {
  return <PostDetailComponent detail={data} />;
}
