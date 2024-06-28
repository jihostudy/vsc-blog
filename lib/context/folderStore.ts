import { create } from "zustand";
import { folderType } from "../types/folder";
// type
import { clientFolderType } from "../types/folder";

interface FolderState {
  folderState: clientFolderType[];
  setFolderState: (folders: clientFolderType[]) => void;
}
const useFolderStore = create<FolderState>((set) => ({
  folderState: [],
  setFolderState: (folders: clientFolderType[]) =>
    set({
      folderState: folders,
    }),
}));

export default useFolderStore;
