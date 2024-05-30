"use client";
import React, { ReactNode, useState } from "react";
// Images & icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// Types
import { postType, tabPostType } from "@/lib/templates/post";

interface PostListProps {
  className: string;
  posts: postType[] | null;
  handleTabPostList: (
    type: "open" | "close",
    post: postType | tabPostType
  ) => void;
}

interface folder {
  folderName: string;
  isOpen: boolean;
}

const PostList = ({
  className,
  posts,
  handleTabPostList,
}: PostListProps): ReactNode => {
  // dummy data
  // FolderName is Unique Key
  const [dummyFolderList, setDummyFolderList] = useState<folder[]>([
    { folderName: "nextjs", isOpen: false },
    { folderName: "react", isOpen: false },
    { folderName: "오류", isOpen: false },
    { folderName: "회고록", isOpen: false },
    { folderName: "html", isOpen: false },
    { folderName: "css", isOpen: false },
  ]);

  // States
  const [focusFolder, setFocusFolder] = useState<string | null>(null); // 파일 생성 위치 판단 위해
  // function
  const toggleFolder = (folderName: string) => {
    const index = dummyFolderList.findIndex(
      (folder) => folder.folderName === folderName
    );
    if (index !== -1) {
      const newFolderList = [...dummyFolderList];
      newFolderList[index] = {
        ...newFolderList[index],
        isOpen: !newFolderList[index].isOpen,
      };
      setDummyFolderList(newFolderList);
    }
    setFocusFolder(folderName);
  };
  const addCategory = () => {};
  const addPost = () => {};
  // Data
  const folder_list = dummyFolderList.map((folder) => {
    const files: postType[] | undefined = posts?.filter(
      (post) => post.folderName === folder.folderName
    );
    const displayFiles = files?.map((file) => (
      <li
        onClick={() => handleTabPostList("open", file)}
        key={file.id}
        className="hover:bg-[#37373D] cursor-pointer"
      >
        {file.title}
      </li>
    ));
    return (
      <>
        <div
          className="hover:bg-[#37373D] cursor-pointer"
          onClick={() => toggleFolder(folder.folderName)}
        >
          <ChevronRightIcon className="p-[2px]" />
          {folder.folderName}
        </div>
        {folder.isOpen && <ul>{displayFiles}</ul>}
      </>
    );
  });

  return (
    <div className={className}>
      <ul className="flex items-center justify-between">
        <li className="cursor-pointer">ADD Folder</li>
        <li className="cursor-pointer">ADD post</li>
      </ul>
      {/* Folder List */}
      {folder_list}
    </div>
  );
};

export default PostList;
