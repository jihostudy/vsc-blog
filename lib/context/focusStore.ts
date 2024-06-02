import { create } from "zustand";
// type
export const ROOT_ID = "";

interface FoucsState {
  focusedID: string;
  foucsedSupFolderID: string;
  setFocusedIDState: (ID: string) => void;
  setFoucsedSupFolderIDState: (folderID: string) => void;
}

const useFocusStore = create<FoucsState>((set) => ({
  focusedID: ROOT_ID,
  foucsedSupFolderID: ROOT_ID,
  setFocusedIDState: (ID: string) => set({ focusedID: ID }),
  setFoucsedSupFolderIDState: (folderID: string) =>
    set({
      foucsedSupFolderID: folderID,
    }),
}));

export default useFocusStore;
