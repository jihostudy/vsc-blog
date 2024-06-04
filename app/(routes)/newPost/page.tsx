import React, { ReactNode } from "react";
// Components
import PostEditor from "@/app/components/posts/PostEditor";
import { getAllFolders, getAllPosts } from "@/lib/firebase/firebaseCRUD";
import { postType } from "@/lib/templates/post";
import { folderType } from "@/lib/templates/folder";
const page = async (): Promise<ReactNode> => {
  const posts = await getAllPosts();
  const folders = await getAllFolders();

  return (
    <PostEditor posts={posts as postType[]} folders={folders as folderType[]} />
  );
};

export default page;
