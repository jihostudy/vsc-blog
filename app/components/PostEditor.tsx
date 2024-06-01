"use client";
import React, {
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
// Icons & Images
// Type
import { postType, initPost } from "@/lib/templates/post";
import SubmitBtn from "./UI/SubmitBtn";

const PostEditor = (): ReactNode => {
  const title = "nextjs post2";
  // State
  const [post, setPost] = useState<postType>(initPost);
  const [maxLineNumber, setMaxLineNumber] = useState<number>(1);
  const lineNumberRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

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
    setPost((prev) => ({
      ...prev,
      title: title,
      // folder 임시
      folderName: "nextjs",
    }));
  }, []);
  // functions
  const handleContentChange = (contents: string) => {
    setMaxLineNumber(contents.split("\n").length);
    if (contents)
      setPost((prev) => ({
        ...prev,
        contents,
      }));
  };
  const handleTitleChange = (title: string) => {
    setPost((prev) => ({
      ...prev,
      title,
    }));
  };

  // Sync scroll positions
  useEffect(() => {
    const syncScroll = () => {
      if (lineNumberRef.current && contentRef.current) {
        lineNumberRef.current.scrollTop = contentRef.current.scrollTop;
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", syncScroll);
      return () => contentElement.removeEventListener("scroll", syncScroll);
    }
  }, []);

  return (
    <form
      className="w-[80vw] h-screen flex flex-col justify-start items-center text-white"
      onSubmit={handleSubmit}
    >
      {/* 제목 */}
      <textarea
        className="outline-none w-full h-[10vh] bg-post p-4 text-2xl"
        placeholder="Title"
        onChange={(e) => handleTitleChange(e.target.value)}
      ></textarea>
      {/* 줄번호 */}
      <div className="flex w-full h-full">
        <textarea
          ref={lineNumberRef}
          readOnly
          className="text-end w-16 h-full leading-relaxed outline-none bg-post pr-4 scrollbar-hide overflow-auto"
          value={lineContent}
        />
        {/* 글쓰기 */}
        <textarea
          ref={contentRef}
          className="outline-none w-full h-full leading-relaxed bg-post scrollbar-hide overflow-y-auto"
          value={post.contents}
          onChange={(e) => handleContentChange(e.target.value)}
          required
        />
      </div>
      <SubmitBtn post={post} />
    </form>
  );
};

export default PostEditor;
