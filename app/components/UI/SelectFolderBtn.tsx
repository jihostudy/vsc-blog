"use client";
import useFolderStore from "@/lib/context/folderStore";
import { clientFolderType, initClientfolder } from "@/lib/types/folder";
import { postType } from "@/lib/types/post";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { ChangeEvent, ReactNode } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
interface SelectFolderBtnProps {
  folderId: string;
  handleFolderChange: (folderID: string) => void;
}

const SelectFolderBtn = ({
  folderId,
  handleFolderChange,
}: SelectFolderBtnProps): ReactNode => {
  // State
  const { folderState, setFolderState } = useFolderStore();

  // Constant
  const folderContainsRooteState: clientFolderType[] = [
    ...folderState,
    initClientfolder,
  ];
  const folderDisplay = folderContainsRooteState?.map((folder) => (
    <MenuItem value={folder.id || ""} sx={{ width: "100%" }} key={folder.id}>
      {folder.folderName ? folder.folderName : "(Root)"}
    </MenuItem>
  ));
  // functions
  const handleChange = (event: SelectChangeEvent) => {
    handleFolderChange(event.target.value as string);
  };

  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        backgroundColor: "#252526",
        border: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormControl fullWidth>
        <InputLabel
          id="select-label"
          sx={{
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
            "&.MuiFormLabel-filled": {
              color: "white",
            },
          }}
        >
          Folder Name
        </InputLabel>
        <Select
          fullWidth
          labelId="select-label"
          id="select"
          type="string"
          label="Select Folder Name"
          value={folderId}
          onChange={handleChange}
          IconComponent={(props) => (
            <ArrowDropDownIcon {...props} style={{ color: "white" }} />
          )}
          sx={{
            backgroundColor: "#252526",
            border: "1px solid white",
            color: "white",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            // "&.Mui-focused": {
            //   boxShadow: "0 0 0 1px white",
            // },
            "& .MuiOutlinedInput-root": {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          }}
        >
          {folderDisplay}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectFolderBtn;
