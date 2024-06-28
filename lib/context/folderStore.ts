import { create } from "zustand";
import { folderType } from "../types/folder";
// type
import { clientFolderType } from "../types/folder";

interface FolderState {
  folderState: clientFolderType[];
  setFolderState: (folders: clientFolderType[]) => void;
}
const useFolderState = create<FolderState>((set) => ({
  folderState: [],
  setFolderState: (folders: clientFolderType[]) =>
    set({
      folderState: folders,
    }),
}));

export default useFolderState;
