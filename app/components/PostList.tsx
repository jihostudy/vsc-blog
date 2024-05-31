"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
// Images & icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// context
import usePostStore from "@/lib/context/postStore";
import useTabStore from "@/lib/context/tabStore";
// Types
import { postType } from "@/lib/templates/post";

interface folder {
  folderName: string;
  isOpen: boolean;
}

const PostList = (): ReactNode => {
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
  const { postState } = usePostStore();
  const { tabState, setTabState } = useTabStore();
  // function
  const toggleFolder = (folderName: string) => {
    const index = dummyFolderList.findIndex(
      (folder) => folder.folderName === folderName
    );
    // 있으면
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
    console.log(postState);

    const files: postType[] | undefined = postState?.filter(
      (post) => post.folderName === folder.folderName
    );
    const displayFiles = files?.map((file) => (
      <Link
        href={`/posts/${file.id}`}
        onClick={() => {
          setTabState("open", file);
        }}
        key={file.id}
        className="hover:bg-[#37373D] cursor-pointer"
      >
        {file.title}
      </Link>
    ));
    return (
      <>
        <div
          className="hover:bg-[#37373D] cursor-pointer"
          onClick={() => {
            console.log("Clicked Toggle folder");

            toggleFolder(folder.folderName);
          }}
        >
          <ChevronRightIcon className="p-[2px]" />
          {folder.folderName}
        </div>
        {folder.isOpen && <ul className="flex flex-col">{displayFiles}</ul>}
      </>
    );
  });

  return (
    <div className="w-[15vw] bg-postlist h-screen text-white">
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
