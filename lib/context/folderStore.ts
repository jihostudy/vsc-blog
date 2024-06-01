import { create } from "zustand";
import { folderType } from "../templates/folder";
// type
import { clientFolderType } from "../templates/folder";

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
