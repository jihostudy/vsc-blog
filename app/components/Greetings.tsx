"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

// Context
import usePostStore from "@/lib/context/postStore";
import useFolderState from "@/lib/context/folderStore";
import { UserInfo } from "@/public/Info/UserInfo";
// Images & Icons
import VSCLogo from "@/public/icons/vscode_black.svg";
import GithubLogo from "@/public/icons/github.png";
// types
import { postType } from "@/lib/templates/post";
import { clientFolderType, folderType } from "@/lib/templates/folder";
import Image from "next/image";

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
    <div className="p-10 w-full bg-post h-screen text-white overflow-y-hidden text-4xl flex items-start justify-center flex-col">
      <Image
        className="p-2 h-1/4 aspect-square"
        src={VSCLogo}
        alt="vscode_image"
      />
      <p>Welcome to {UserInfo.name}'s Blog!</p>
      <div className="grid pt-4 grid-cols-2 grid-rows-2 text-lg h-[10vh] aspect-square">
        {/* <p className="text-xl grid-cols-2"> */}
        <p>✉️</p>
        <Link
          href={`mailto:${UserInfo.email}`}
          className="underline cursor-pointer"
        >
          {UserInfo.email}
        </Link>
        {/* </p> */}
        {/* <p className="flex justify-start items-center grid-cols-2"> */}
        <Image
          className="p-2 w-4/5 aspect-square"
          src={GithubLogo}
          alt="github_logo"
        />
        <Link
          href={`${UserInfo.githubURL}`}
          target="_blank"
          className="underline cursor-pointer"
        >
          {UserInfo.githubURL}
        </Link>
        {/* </p> */}
      </div>
    </div>
  );
};

export default Greetings;
