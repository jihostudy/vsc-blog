"use client";
import React, { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
// components
import PostEditor from "./PostEditor";
// import PostDisplay from "./PostDisplay";
import { findFirstMatchingElement } from "@/lib/functions/arrayFunctions";
// Context
import useTabStore from "@/lib/context/tabStore";
// types
import { postType } from "@/lib/templates/post";
import { tabType } from "@/lib/templates/tab";

interface PostProps {
  className: string;
}

// const PostDisplay = dynamic(() => import('@/app/components/PostDisplay'));
const Post = ({ className }: PostProps): ReactNode => {
  // State
  const { tabState, setTabState } = useTabStore();

  //style
  const tab_style =
    "bg-navbar w-fit h-full p-2 hover:bg-white hover:text-black cursor-pointer pr-4";

  // Data
  const displayPost = findFirstMatchingElement(
    tabState,
    (tab) => tab.display === true
  );

  const tabs = tabState.map((tab) => {
    return (
      <li
        key={tab.id}
        onClick={() => setTabState("navigate", tab)}
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
    <div className={className}>
      {/* Tabs */}
      {/* <ul className="relative w-full h-9 bg-post flex justify-start items-center">
        {tabs}
      </ul> */}
      {/* PostContent */}
      <div className="w-full h-full bg-post text-white text-9xl">
        지호 블로그
        {/* <PostDisplay displayPost={displayPost as tabType} /> */}
        {/* <PostEditor /> */}
      </div>
    </div>
  );
};

export default Post;
