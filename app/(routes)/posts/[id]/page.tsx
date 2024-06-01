import React, { ReactNode, Suspense } from "react";
// Providers
import MDXRemoteProvider from "@/lib/providers/MDXRemoteProvider";
// Components
import Tab from "@/app/components/Tab";
// Firebase
import { getAllPosts } from "@/lib/firebase/firebaseCRUD";
import { postType } from "@/lib/templates/post";

interface PostPageProps {
  params: { id: string };
}
const Page = async ({ params }: PostPageProps): Promise<ReactNode> => {
  const posts: postType[] = await getAllPosts();
  console.log("Fetched from Posts", posts);
  console.log("params", params);

  const postContent: string | undefined = posts.find(
    (post) => post.id === params.id
  )?.contents;
  console.log(postContent);

  return (
    <>
      <Tab posts={posts as postType[]} />
      <Suspense fallback={<>Loading Post...</>}>
        <MDXRemoteProvider source={postContent} />
      </Suspense>
    </>
  );
};

export default Page;
