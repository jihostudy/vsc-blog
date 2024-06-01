"use client";
import React, { ReactNode, useEffect } from "react";
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

  // Style
  //style
  const tab_style =
    "bg-navbar w-fit h-full p-2 hover:bg-white hover:text-black cursor-pointer pr-4";
  const tabs = tabState.map((tab) => {
    return (
      <li
        key={tab.id}
        onClick={() => router.push(`/posts/${tab.id}`)}
        className={tab_style}
      >
        {tab.title}
        <button
          onClick={() => setTabState("close", tab)}
          className="hover:bg-slate-800"
        >
          닫기
        </button>
      </li>
    );
  });
  return (
    <ul className="relative w-full h-9 bg-post flex justify-start items-center">
      {tabs}
    </ul>
  );
};

export default Tab;
