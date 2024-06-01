"use client";
import React, { ReactNode, useEffect } from "react";
// Images & icons
import CloseIcon from "@mui/icons-material/Close";
// Context
import usePostStore from "@/lib/context/postStore";
import useTabStore from "@/lib/context/tabStore";
import { useRouter } from "next/navigation";
// Type
import { postType } from "@/lib/templates/post";

interface TabProps {
  posts: postType[];
}

const Tab = ({ posts }: TabProps): ReactNode => {
  const router = useRouter();
  // States
  const { postState, setPostState } = usePostStore();
  const { tabState, setTabState } = useTabStore();
  useEffect(() => {
    console.log("tab에서 post update: ", posts);
    setPostState(posts);
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
