"use client";
import React, { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
// components
import PostEditor from "./PostEditor";
// import PostDisplay from "./PostDisplay";
import { findFirstMatchingElement } from "@/lib/functions/findElement";
// Context
import usePostStore from "@/lib/context/postStore";
import useFolderState from "@/lib/context/folderStore";
// types
import { postType } from "@/lib/templates/post";
import { clientFolderType, folderType } from "@/lib/templates/folder";

interface PostProps {
  posts: postType[];
  folders: folderType[];
}

// const PostDisplay = dynamic(() => import('@/app/components/PostDisplay'));
const Greetings = ({ posts, folders }: PostProps): ReactNode => {
  // State
  const { postState, setPostState } = usePostStore();
  const { folderState, setFolderState } = useFolderState();

  useEffect(() => {
    setPostState(posts);
    const clientFolderState: clientFolderType[] = folders.map((folder) => {
      const wasItOpen: boolean = folderState.find(
        (provFolder) => provFolder.id === folder.id
      )
        ? true
        : false;
      return {
        ...folder,
        isOpen: wasItOpen,
      };
    });
    setFolderState(clientFolderState);
  }, []);

  return (
    <div className="p-10 w-full bg-post h-screen text-white overflow-y-hidden text-4xl">
      <div className="border-1 border-solid border-white w-full "></div>
    </div>
  );
};

export default Greetings;
