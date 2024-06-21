import React, { ReactNode, Suspense } from "react";
// Providers
import MDXRemoteProvider from "@/lib/providers/MDXRemoteProvider";
// Components
import Tab from "@/app/components/common/Tab";
// Firebase
import {
  getAllComments,
  getAllFolders,
  getAllPosts,
} from "@/lib/firebase/firebaseCRUD";
// Type
import { postType } from "@/lib/templates/post";
import { folderType } from "@/lib/templates/folder";
import { Timestamp } from "firebase/firestore";
import Terminal from "@/app/components/posts/Terminal";
import { commentType } from "@/lib/templates/comment";
import { convertTimestamp } from "@/lib/functions/convertTimestamp";
import ToolBox from "@/app/components/UI/ToolBox";

interface PostPageProps {
  params: { id: string };
}
const Page = async ({ params }: PostPageProps): Promise<ReactNode> => {
  const posts: postType[] = await getAllPosts();
  const folders: folderType[] = await getAllFolders();
  const comments: commentType[] = await getAllComments();

  const post = posts.find((post) => post.id === params.id);
  // post가 undefined아님!
  if (!post) {
    throw new Error(`Post with id ${params.id} not found`);
  }
  const content: string = post.contents;
  const title: string = post.title;
  const viewCount: number = post.viewCount;
  const formattedDate = convertTimestamp(post.timeStamp);

  const commentList: commentType[] = comments.filter(
    (comment) => comment.postID === params.id
  );
  return (
    <>
      <Tab
        posts={posts as postType[]}
        folders={folders as folderType[]}
        postID={params.id}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            Loading Post...
          </div>
        }
      >
        <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-center py-4 relative">
          {/* 제목 */}
          <div className="pb-2 w-fit self-center flex items-center justify-center text-5xl font-bold border-b-2 border-solid border-white">
            {title}
          </div>
          {/* 작성날짜 | 조회수*/}
          <div className="pt-2 w-fit self-center flex items-center justify-center text-base font-bold">
            {formattedDate} | 조회수 {viewCount}
          </div>
          <ToolBox className="absolute bottom-12 right-12 top-auto"/>
          <MDXRemoteProvider source={content} />
        </div>
        <Terminal post={post} commentList={commentList} />
      </Suspense>
    </>
  );
};

export default Page;
