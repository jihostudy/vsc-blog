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
import { Timestamp } from "firebase/firestore";

interface PostPageProps {
  params: { id: string };
}
const Page = async ({ params }: PostPageProps): Promise<ReactNode> => {
  const posts: postType[] = await getAllPosts();
  const folders: folderType[] = await getAllFolders();

  const post = posts.find((post) => post.id === params.id);
  // post가 undefined아님!
  if (!post) {
    throw new Error(`Post with id ${params.id} not found`);
  }
  const content: string = post.contents;
  const title: string = post.title;
  const viewCount: number = post.viewCount;
  // 원하는 형식으로 변환
  const date = new Date(post.timeStamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}. ${month}. ${day}. ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  return (
    <>
      <Tab posts={posts as postType[]} folders={folders as folderType[]} />
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            Loading Post...
          </div>
        }
      >
        {/* 제목 */}
        <div className="pb-2 w-fit self-center flex items-center justify-center text-5xl font-bold border-b-2 border-solid border-white">
          {title}
        </div>
        {/* 작성날짜 | 조회수*/}
        <div className="pt-2 w-fit self-center flex items-center justify-center text-base font-bold">
          {formattedDate} | 조회수 {viewCount}
        </div>
        <MDXRemoteProvider source={content} />
      </Suspense>
    </>
  );
};

export default Page;
