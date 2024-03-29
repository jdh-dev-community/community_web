import { Header } from "@/components/header";
import { PostDetailComponent } from "@/components/postDetail/PostDetail";
import { PostDetail_Response } from "@/types/api/postApi";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface Props {
  detail: PostDetail_Response;
}

export const getServerSideProps = (async ({ params }) => {
  if (params?.id) {
    const response = await fetch(
      `${process.env.BASE_URI}/api/v1/post/${params.id}`
    );
    const data = await response.json();

    return {
      props: { detail: data },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default function PostDetail({
  detail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header />
      <div className="pt-[95px]">
        <PostDetailComponent
          detail={detail}
          className="py-[10px] px-[40px]"
          isMobile
        />
      </div>
    </>
  );
}
