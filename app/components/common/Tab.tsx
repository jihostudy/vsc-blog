"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
// Images & icons
import CloseIcon from "@mui/icons-material/Close";
// Context
import usePostStore from "@/lib/context/postStore";
import useTabStore from "@/lib/context/tabStore";
import useFolderState from "@/lib/context/folderStore";
import useFocusStore from "@/lib/context/focusStore";

// Type
import { postType } from "@/lib/templates/post";
import { clientFolderType, folderType } from "@/lib/templates/folder";

interface TabProps {
  posts: postType[];
  folders: folderType[];
  postID: string;
}

const Tab = ({ posts, folders, postID }: TabProps): ReactNode => {
  const router = useRouter();
  // States
  const { postState, setPostState } = usePostStore();
  const { folderState, setFolderState } = useFolderState();
  const { focusedID } = useFocusStore();
  const { tabState, setTabState } = useTabStore();
  useEffect(() => {
    setPostState(posts);
    const clientFolderState: clientFolderType[] = folders.map((folder) => {
      const wasItOpen: boolean = folderState.find(
        (prevFolder) => prevFolder.id === folder.id
      )?.isOpen
        ? true
        : false;

      return {
        ...folder,
        isOpen: wasItOpen,
      };
    });
    setFolderState(clientFolderState);

    // posts에서 새로고침 한 경우 : 현재 페이지 tabSTate에 추가
    const isRefresh = !tabState.find((tab) => tab.id === postID);
    if (isRefresh) {
      console.log("PostState", postState);
      console.log("PostID", postID);

      const currPost: postType | undefined = postState.find(
        (post) => post.id === postID
      );
      console.log("1");

      if (currPost) {
        console.log("2");

        setTabState("open", currPost as postType);
      }
    }
  }, []);

  const tabs = tabState.map((tab) => {
    const isOpen: boolean = tab.id === focusedID;
    const list_style = isOpen
      ? "flex justify-end items-center bg-[#8F75D2] text-[#E2C08D] w-fit h-full p-2 hover:bg-white cursor-pointer"
      : "flex justify-end items-center bg-navbar w-fit h-full p-2 hover:bg-white hover:text-black cursor-pointer";
    return (
      <li
        key={tab.id}
        onClick={() => router.push(`/posts/${tab.id}`)}
        className={list_style}
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
