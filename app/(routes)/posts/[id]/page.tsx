import React, { ReactNode, Suspense } from "react";
// Providers
import MDXRemoteProvider from "@/lib/providers/MDXRemoteProvider";
// Components
import Tab from "@/app/components/Tab";
// Firebase
import { getAllFolders, getAllPosts } from "@/lib/firebase/firebaseCRUD";
// Type
import { postType } from "@/lib/templates/post";
import { folderType } from "@/lib/templates/folder";

interface PostPageProps {
  params: { id: string };
}
const Page = async ({ params }: PostPageProps): Promise<ReactNode> => {
  const posts: postType[] = await getAllPosts();
  const folders: folderType[] = await getAllFolders();

  const postContent: string | undefined = posts.find(
    (post) => post.id === params.id
  )?.contents;
  console.log(postContent);

  return (
    <>
      <Tab posts={posts as postType[]} folders={folders as folderType[]} />
      <Suspense fallback={<>Loading Post...</>}>
        <MDXRemoteProvider source={postContent} />
      </Suspense>
    </>
  );
};

export default Page;
