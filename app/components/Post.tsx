"use client";
import React, { ReactNode, useState } from "react";
// components
import PostEditor from "./PostEditor";
// types
import { postType, tabPostType } from "@/lib/templates/post";
import PostDisplay from "./PostDisplay";
import { findFirstMatchingElement } from "@/lib/functions/arrayFunctions";

interface PostProps {
  tabPostList: tabPostType[];
  handleTabPostList: (
    type: "open" | "close",
    post: postType | tabPostType
  ) => void;
  handleDisplayPost: (post: tabPostType) => void;
  className: string;
}
const Post = ({
  tabPostList,
  handleTabPostList,
  handleDisplayPost,
  className,
}: PostProps): ReactNode => {
  //style
  const tab_style =
    "bg-navbar w-fit h-full p-2 hover:bg-white hover:text-black cursor-pointer pr-4";

  // Data
  const displayPost = findFirstMatchingElement(
    tabPostList,
    (tabPost) => tabPost.display === true
  );

  const tabs = tabPostList.map((post) => {
    return (
      <li
        key={post.id}
        onClick={() => handleDisplayPost(post)}
        className={tab_style}
      >
        {post.title}
        <button
          onClick={() => handleTabPostList("close", post)}
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
      <ul className="absolute w-full h-9 bg-post flex justify-start items-center">
        {tabs}
      </ul>
      {/* PostContent */}
      <div className="w-full h-full bg-post ">
        <PostDisplay displayPost={displayPost as tabPostType} />
        {/* <PostEditor /> */}
      </div>
    </div>
  );
};

export default Post;
