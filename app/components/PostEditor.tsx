"use client";
import { addPost } from "@/lib/firebase/firebaseCRUD";
import React, { FormEvent, ReactNode, useEffect, useState } from "react";
// Type
import { postType, initPost } from "@/lib/templates/post";

const PostEditor = (): ReactNode => {
  const title = "nextjs post2";
  // State
  const [postContent, setPostContent] = useState<postType>(initPost);
  const [maxLineNumber, setMaxLineNumber] = useState<number>(1);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };
  // Data
  let lineContent: string = "";
  for (let i = 1; i <= maxLineNumber; i++) {
    lineContent += i + "\n";
  }

  // 제목 넘겨받는거 수정 필요
  useEffect(() => {
    setPostContent((prev) => ({
      ...prev,
      title: title,
      // folder 임시
      folderName: "nextjs",
    }));
  }, []);
  // functions
  const handleContentChange = (contents: string) => {
    setMaxLineNumber(contents.split("\n").length);
    setPostContent((prev) => ({
      ...prev,
      contents,
    }));
  };

  const handleAddPost = (post: postType) => {
    addPost(post);
    alert("글 등록됨");
  };
  return (
    <form
      className="w-full mt-9 h-full flex justify-start items-center"
      onSubmit={handleSubmit}
    >
      {/* 제목은 만들때 생성됨 */}
      {/* 줄번호 */}
      <textarea
        readOnly
        className="flex flex-col justify-start text-end w-12 h-full leading-relaxed outline-none bg-post pr-4"
        value={lineContent}
      />
      {/* 글쓰기 */}
      <textarea
        className="bg-post outline-none w-full h-full leading-relaxed"
        value={postContent.contents}
        onChange={(e) => handleContentChange(e.target.value)}
        required
      />
      <button
        className="absolute border-white border-1 border-solid"
        // type="submit"
        onClick={() => handleAddPost(postContent)}
      >
        글 등록하기
      </button>
    </form>
  );
};

export default PostEditor;
