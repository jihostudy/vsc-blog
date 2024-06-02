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
  className: string;
}

// const PostDisplay = dynamic(() => import('@/app/components/PostDisplay'));
const Greetings = ({ posts, folders, className }: PostProps): ReactNode => {
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

  return <div className={className}>지호의 블로그에 오신것을 환영합니다</div>;
};

export default Greetings;
