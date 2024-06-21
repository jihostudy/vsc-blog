"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
// Images & icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderLogo from "@/public/icons/add_folder.png";

// context
import usePostStore from "@/lib/context/postStore";
import useTabStore from "@/lib/context/tabStore";
import useFocusStore, { ROOT_ID } from "@/lib/context/focusStore";
import useFolderState from "@/lib/context/folderStore";
// Types
import { postType } from "@/lib/templates/post";
import {
  clientFolderType,
  folderType,
  initClientfolder,
} from "@/lib/templates/folder";
import AddFolderBtn from "../UI/AddFolderBtn";
import { updateViewCount } from "@/lib/firebase/firebaseCRUD";
import Image from "next/image";
import useLoginStore from "@/lib/context/loginStore";

interface ClientFolderType extends folderType {
  isOpen: boolean; // DB에 저장할 필요 없음
}

const PostList = (): ReactNode => {
  const { loginState } = useLoginStore();

  // ref
  const postListRef = useRef<HTMLDivElement>(null);
  const folderContainerRef = useRef<HTMLDivElement>(null);
  // States
  const [openNewFolderTab, setOpenNewFolderTab] = useState<boolean>(false);
  const { postState } = usePostStore();
  const { tabState, setTabState } = useTabStore();
  const {
    focusedID,
    setFocusedIDState,
    focusedSupFolderID,
    setFocusedSupFolderIDState: setFocusedSupFolderIDState,
  } = useFocusStore();
  const { folderState, setFolderState } = useFolderState();

  // Functions
  const toggleFolder = (toggledFolder: ClientFolderType) => {
    const index = folderState.findIndex(
      (folder) => folder.id === toggledFolder.id
    );
    // 있으면
    console.log(index);

    if (index !== -1) {
      // isOpen 바꾸기
      const newFolderList = [...folderState];
      newFolderList[index] = {
        ...newFolderList[index],
        isOpen: !newFolderList[index].isOpen,
      };
      setFolderState(newFolderList);
    }
    setFocusedSupFolderIDState(toggledFolder.id); // 자신의 id
    setFocusedIDState(toggledFolder.id);
  };

  const toggleFile = (toggledFile: postType) => {
    // 부모 folder id
    console.log(toggledFile.folderID);
    console.log(folderState);

    const targetFolder: string | undefined = folderState.find((element) => {
      element.id == toggledFile.folderID;
    })?.id;

    setFocusedSupFolderIDState(targetFolder as string);
    setFocusedIDState(toggledFile.id);
    setTabState("open", toggledFile);
    updateViewCount(toggledFile.id);
  };

  const getFileList = (
    folderInput: ClientFolderType,
    fileInput: postType[],
    Level: number
  ): React.JSX.Element[] => {
    const files: postType[] | undefined = fileInput?.filter(
      (post) => post.folderID === folderInput.id
    );
    const paddingLeft = `pl-${4 * Level}`;

    const style = `${paddingLeft} flex items-center h-8 py-1.5 hover:bg-postlistHover cursor-pointer truncate box-border w-full`;
    const focusedStyle = `${paddingLeft} flex items-center h-8 py-1.5 bg-postlistFocused border-[#007FD4] border-1 border-solid  cursor-pointer truncate box-border w-full`;
    const fileList = files?.map((file) => (
      <Link
        href={`/posts/${file.id}`}
        onClick={() => toggleFile(file)}
        key={file.id}
        className={file.id === focusedID ? focusedStyle : style}
      >
        {file.title}
      </Link>
    ));
    return fileList;
  };

  const getFolderList = (
    folderInput: clientFolderType,
    Level: number
  ): React.JSX.Element[] => {
    // 폴더들

    const folders: clientFolderType[] = folderState?.filter(
      (folder) => folder.supFolderID == folderInput.id
    );
    const paddingLeft = `pl-${Level}`;
    const style = `${paddingLeft} w-full h-8 hover:bg-postlistHover cursor-pointer truncate box-border flex items-center`;
    const focusedStyle = `${paddingLeft} w-full h-8 bg-postlistFocused border-[#007FD4] cursor-pointer truncate box-border flex items-center`;

    const folderList = folders?.map((folder: clientFolderType) => (
      <React.Fragment key={folder.folderName}>
        <div
          className={folder.id === focusedID ? focusedStyle : style}
          onClick={() => toggleFolder(folder)}
        >
          {folder.isOpen ? (
            <ExpandMoreIcon />
          ) : (
            <ChevronRightIcon className="p-[2px]" />
          )}

          {folder.folderName}
        </div>
        {folder.isOpen && (
          <ul className="flex flex-col w-full">
            {getDataList(folder, Level + 1)}
          </ul>
        )}
      </React.Fragment>
    ));
    return folderList;
  };

  // Data
  const getDataList = (folderInput: clientFolderType, Level: number) => {
    return (
      <>
        {getFolderList(folderInput, Level)}
        {getFileList(folderInput, postState, Level)}
      </>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        folderContainerRef.current &&
        !folderContainerRef.current.contains(event.target as Node) &&
        postListRef.current?.contains(event.target as Node)
      ) {
        console.log("Exe");

        setFocusedSupFolderIDState(ROOT_ID);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setFocusedSupFolderIDState]);

  return (
    <div className="w-[12vw] bg-postlist h-screen text-white" ref={postListRef}>
      <div className="p-3 flex items-center justify-between">
        <span>Source Control</span>
        {loginState === "admin" && (
          <Image
            onClick={() => {
              setOpenNewFolderTab((prev) => !prev);
            }}
            className="w-[10%] aspect-square cursor-pointer"
            src={FolderLogo}
            alt="folder_logo"
          />
        )}
      </div>
      {/* Folder List */}
      <div
        ref={folderContainerRef}
        className="flex items-start flex-col w-full"
      >
        {getDataList(initClientfolder, 0)}
        {openNewFolderTab ? <AddFolderBtn /> : ""}
      </div>
    </div>
  );
};

export default PostList;
