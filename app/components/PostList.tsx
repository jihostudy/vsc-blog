"use client";
import React, { ReactNode, useState } from "react";
// Images & icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PostListProps {
  className: string;
}
const PostList = ({ className }: PostListProps): ReactNode => {
  // dummy data
  const [dummyFolderList, setDummyFolderList] = useState<string[]>([
    "nextjs",
    "react",
    "오류",
    "회고록",
    "html",
    "css",
  ]);
  const [dummyPostList, setDummyPostList] = useState([
    {
      nextjs: [
        {
          title: "nextjs post1",
          contents: "Hello nextjs1!",
          date: new Date().toLocaleDateString(),
        },
        {
          title: "nextjs post2",
          contents: "Hello nextjs2!",
          date: new Date().toLocaleDateString(),
        },
      ],
      react: [
        {
          title: "react post1",
          contents: "Hello react1!",
          date: new Date().toLocaleDateString(),
        },
        {
          title: "react post2",
          contents: "Hello react2!",
          date: new Date().toLocaleDateString(),
        },
      ],
      오류: [
        {
          title: "error post1",
          contents: "Hello error1!",
          date: new Date().toLocaleDateString(),
        },
        {
          title: "error post2",
          contents: "Hello error2!",
          date: new Date().toLocaleDateString(),
        },
      ],
    },
  ]);
  // States
  const [prevFocus, setPrevFocus] = useState<string | null>(null); // 파일 생성 위치 판단 위해
  // Data
  const folder_list = dummyFolderList.map((folder) => {
    return (
      <li
        key={folder}
        className="hover:bg-[#37373D] cursor-pointer"
        onClick={() => setPrevFocus(folder)}
      >
        <ChevronRightIcon className="p-[2px]" />
        {folder}
      </li>
    );
  });
  // function
  const addCategory = () => {};
  const addPost = () => {};
  return (
    <div className={className}>
      <ul className="flex items-center justify-between">
        <li className="cursor-pointer">ADD Category</li>
        <li className="cursor-pointer">ADD post</li>
      </ul>
      {/* Category List */}
      <ul className="">{folder_list}</ul>
    </div>
  );
};

export default PostList;
