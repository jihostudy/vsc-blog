"use client";
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
// Firebase
import { addFolder } from "@/lib/firebase/firebaseCRUD";
// Icons & Images
import { TextField } from "@mui/material";
// Types
import { path } from "@/lib/types/paths";
import { initFolder, clientFolderType, folderType } from "@/lib/types/folder";
// Context
import useFocusStore from "@/lib/context/focusStore";
import useFolderStore from "@/lib/context/folderStore";
import delayTimeout from "@/lib/functions/asyncTimeout";

const AddFolderBtn = (): ReactNode => {
  const router = useRouter();
  // State
  const [newFolder, setNewFolder] = useState<folderType>(initFolder);
  const { folderState, setFolderState } = useFolderStore();
  const { focusedSupFolderID } = useFocusStore();

  const addFolderHandler = async () => {
    try {
      const folder: folderType = {
        ...newFolder,
        supFolderID: focusedSupFolderID,
      };
      const res = await addFolder(folder); // DB는 folderType 넘겨주기
      delayTimeout(1000);
      const newFolders: clientFolderType[] = [
        ...folderState,
        {
          ...newFolder,
          isOpen: true, // 클라이언트만 필요한 isOpen
        },
      ];

      setFolderState(newFolders);
    } catch (error) {
      console.log("Error occured on client addFolder", error);
    }
  };

  const handleFolderNameChange = (folderName: string) => {
    setNewFolder((prev) => ({
      ...prev,
      folderName,
    }));
  };
  return (
    <form onSubmit={addFolderHandler} className="place-self-center">
      <TextField
        // ref={folderContainerRef}
        id="standard-basic"
        type="text"
        label="Add Folder"
        variant="standard"
        // onClick={addFolderHandler}
        sx={{
          input: { color: "white" },
          width: "80%",
          "& .MuiInput-underline:before": { borderBottomColor: "white" },
          "& .MuiInput-underline:after": { borderBottomColor: "white" },
          marginBottom: "0.5rem",
        }}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        onChange={(e) => handleFolderNameChange(e.target.value)}
      />
    </form>
  );
};

export default AddFolderBtn;
