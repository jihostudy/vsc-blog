"use client";
import React, { ReactNode, useState } from "react";
// components
import PostEditor from "./PostEditor";

interface PostProps {
  className: string;
}
const Post = ({ className }: PostProps): ReactNode => {
  //style
  const tab_style =
    "bg-navbar w-fit h-full p-2 hover:bg-white hover:text-black cursor-pointer pr-4";
  // dymmy_data
  const [tabList, setTabList] = useState<string[]>([
    "page.tsx",
    "mdxprovider.tsx",
  ]);
  // Data
  const tabs = tabList.map((tab) => {
    return (
      <li key={tab} className={tab_style}>
        {tab}
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
        <PostEditor />
      </div>
    </div>
  );
};

export default Post;
