"use client";
import React, { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
// components
import PostEditor from "./PostEditor";
// import PostDisplay from "./PostDisplay";
import { findFirstMatchingElement } from "@/lib/functions/arrayFunctions";
// Context
// types
import { postType } from "@/lib/templates/post";
import usePostStore from "@/lib/context/postStore";

interface PostProps {
  posts: postType[];
  className: string;
}

// const PostDisplay = dynamic(() => import('@/app/components/PostDisplay'));
const Greetings = ({ posts, className }: PostProps): ReactNode => {
  // State
  const { postState, setPostState } = usePostStore();

  useEffect(() => {
    console.log("Grretings에서 post update: ", posts);
    setPostState(posts);
  }, []);

  return <div className={className}>지호의 블로그에 오신것을 환영합니다</div>;
};

export default Greetings;
