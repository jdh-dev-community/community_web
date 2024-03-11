import { PostDetailComponent } from "@/components/postDetail/PostDetail";

export default function PostDetail({ data }: { data: any }) {
  return <PostDetailComponent detail={data} />;
}
