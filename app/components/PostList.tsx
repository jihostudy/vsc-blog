"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
// Images & icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  // Data
  const folder_list = dummyFolderList.map((folder) => {
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
        className="flex items-center pl-5 py-1.5 hover:bg-[#37373D] cursor-pointer"
      >
        {file.title}
      </Link>
    ));
    return (
      <React.Fragment key={folder.folderName}>
        <div
          className=" hover:bg-[#37373D] cursor-pointer"
          onClick={() => {
            console.log("Clicked Toggle folder");

            toggleFolder(folder.folderName);
          }}
        >
          {folder.isOpen ? (
            <ExpandMoreIcon />
          ) : (
            <ChevronRightIcon className="p-[2px]" />
          )}

          {folder.folderName}
        </div>
        {folder.isOpen && <ul className="flex flex-col">{displayFiles}</ul>}
      </React.Fragment>
    );
  });

  return (
    <div className="w-[15vw] bg-postlist h-screen text-white">
      <div className="p-3 flex items-center justify-between">
        Source Control
      </div>
      {/* Folder List */}
      {folder_list}
    </div>
  );
};

export default PostList;
