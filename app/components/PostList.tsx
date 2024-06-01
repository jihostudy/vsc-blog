"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
// Images & icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";

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
import AddFolderBtn from "./UI/AddFolderBtn";

interface ClientFolderType extends folderType {
  isOpen: boolean; // DB에 저장할 필요 없음
}

const PostList = (): ReactNode => {
  const FileLevel = 1;
  // ref
  const postListRef = useRef<HTMLDivElement>(null);
  const folderContainerRef = useRef<HTMLDivElement>(null);
  // States
  const { postState } = usePostStore();
  const { tabState, setTabState } = useTabStore();
  const { foucsedSupFolderID, setFoucsedSupFolderIDState } = useFocusStore();
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
    setFoucsedSupFolderIDState(toggledFolder.id); // 자신의 id
  };
  const toggleFile = (toggledFile: postType) => {
    // 부모 folder id
    const targetFolderID: string | undefined = folderState.find((folder) => {
      folder.id === toggledFile.folderID;
    })?.id;
    setFoucsedSupFolderIDState(targetFolderID as string);
  };

  const getFileList = (
    folderInput: ClientFolderType,
    fileInput: postType[]
  ): React.JSX.Element[] => {
    const files: postType[] | undefined = fileInput?.filter(
      (post) => post.folderID === folderInput.id
    );

    const fileList = files?.map((file) => (
      <Link
        href={`/posts/${file.id}`}
        onClick={() => {
          toggleFile(file);
          setTabState("open", file);
        }}
        key={file.id}
        className="flex items-center pl-5 py-1.5 hover:bg-[#37373D] cursor-pointer"
      >
        {file.title}
      </Link>
    ));
    return fileList;
  };

  const getFolderList = (
    folderInput: clientFolderType
  ): React.JSX.Element[] => {
    // 폴더들

    const folders: clientFolderType[] = folderState?.filter(
      (folder) => folder.supFolderID == folderInput.id
    );

    const folderList = folders?.map((folder) => (
      <React.Fragment key={folder.folderName}>
        <div
          className="w-full hover:bg-[#37373D] cursor-pointer"
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
          <ul className="flex flex-col">{getDataList(folder)}</ul>
        )}
      </React.Fragment>
    ));
    return folderList;
  };

  // Data
  const getDataList = (folderInput: clientFolderType) => {
    // for (let i = 0; i < folderState.length; i++) {
    //   if (folderInput.id === folderState[i].supFolderID) {
    //     console.log("같음");
    //   } else {
    //     console.log("다른");
    //   }
    // }

    // const datas: clientFolderType[] = folderState.filter(
    //   (data) => (data.supFolderID = folderInput.id)
    // );
    // console.log("getDataList");
    // console.log(datas);
    return (
      <>
        {getFolderList(folderInput)}
        {getFileList(folderInput, postState)}
      </>
    );
    // const dataList: React.JSX.Element[] = folderState.map((folder) => {
    //   return (
    //     <>
    //       {getFolderList(folder)}
    //       {getFileList(folder, postState)}
    //     </>
    //   );
    // });
    // return dataList;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        folderContainerRef.current &&
        !folderContainerRef.current.contains(event.target as Node) &&
        postListRef.current?.contains(event.target as Node)
      ) {
        console.log("Exe");

        setFoucsedSupFolderIDState(ROOT_ID);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setFoucsedSupFolderIDState]);

  useEffect(() => {
    console.log(foucsedSupFolderID);
  }, [foucsedSupFolderID]);
  useEffect(() => {
    console.log("Get data list");
    console.log(getDataList(initClientfolder));
  }, []);
  return (
    <div className="w-[15vw] bg-postlist h-screen text-white" ref={postListRef}>
      <div className="p-3 flex items-center justify-between">
        Source Control
      </div>
      {/* Folder List */}
      <div ref={folderContainerRef} className="flex items-start flex-col">
        {getDataList(initClientfolder)}
        <AddFolderBtn />
      </div>
      {/* 폴더 추가 임시 */}

      {/* <button className="text-white text-xl flex justify-center items-center mt-10 w-full hover:bg-white hover:text-black font-bold">
        폴더 추가하기
      </button> */}
    </div>
  );
};

export default PostList;
