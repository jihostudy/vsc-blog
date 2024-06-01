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
import AddPostBtn from "./UI/AddPostBtn";
import useFocusStore from "@/lib/context/focusStore";

const PostEditor = (): ReactNode => {
  // State
  const { foucsedSupFolderID } = useFocusStore();

  const [newPost, setNewPost] = useState<postType>(initPost);
  const [maxLineNumber, setMaxLineNumber] = useState<number>(1);
  // Ref
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

  useEffect(() => {
    setNewPost((prev) => ({
      ...prev,
      // folder 임시
      folderID: foucsedSupFolderID,
    }));
  }, []);
  // functions
  const handleContentChange = (contents: string) => {
    setMaxLineNumber(contents.split("\n").length);
    if (contents)
      setNewPost((prev) => ({
        ...prev,
        contents,
      }));
  };
  const handleTitleChange = (title: string) => {
    setNewPost((prev) => ({
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
          value={newPost.contents}
          onChange={(e) => handleContentChange(e.target.value)}
          required
        />
      </div>
      <AddPostBtn newPost={newPost} />
    </form>
  );
};

export default PostEditor;
