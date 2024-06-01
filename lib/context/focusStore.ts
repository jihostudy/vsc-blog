import { create } from "zustand";
// type
export const ROOT_ID = "";

interface FoucsState {
  foucsedSupFolderID: string;
  setFoucsedSupFolderIDState: (folderID: string) => void;
}

const useFocusStore = create<FoucsState>((set) => ({
  foucsedSupFolderID: ROOT_ID,
  setFoucsedSupFolderIDState: (folderID: string) =>
    set({
      foucsedSupFolderID: folderID,
    }),
}));

export default useFocusStore;
