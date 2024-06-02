"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
// Images & icons
import CloseIcon from "@mui/icons-material/Close";
// Context
import usePostStore from "@/lib/context/postStore";
import useTabStore from "@/lib/context/tabStore";
import useFolderState from "@/lib/context/folderStore";
// Type
import { postType } from "@/lib/templates/post";
import { clientFolderType, folderType } from "@/lib/templates/folder";

interface TabProps {
  posts: postType[];
  folders: folderType[];
}

const Tab = ({ posts, folders }: TabProps): ReactNode => {
  const router = useRouter();
  // States
  const { postState, setPostState } = usePostStore();
  const { folderState, setFolderState } = useFolderState();

  const { tabState, setTabState } = useTabStore();
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

  const tabs = tabState.map((tab) => {
    return (
      <li
        key={tab.id}
        onClick={() => router.push(`/posts/${tab.id}`)}
        className={
          "flex justify-end items-center bg-navbar w-fit h-full p-2 hover:bg-white hover:text-black cursor-pointer"
        }
      >
        {tab.title}
        <button
          onClick={() => setTabState("close", tab)}
          className="ml-1 hover:bg-tabCloseHover rounded-md  "
        >
          <CloseIcon />
        </button>
      </li>
    );
  });
  return (
    <ul className="relative w-full h-9 bg-post flex justify-start items-center overflow-x-auto">
      {tabs}
    </ul>
  );
};

export default Tab;
