import { create } from "zustand";
// type
export const ROOT_ID = "";

interface FocusState {
  focusedID: string;
  focusedSupFolderID: string;
  setFocusedIDState: (ID: string) => void;
  setFocusedSupFolderIDState: (folderID: string) => void;
}

const useFocusStore = create<FocusState>((set) => ({
  focusedID: ROOT_ID,
  focusedSupFolderID: ROOT_ID,
  setFocusedIDState: (ID: string) => set({ focusedID: ID }),
  setFocusedSupFolderIDState: (folderID: string) =>
    set({
      focusedSupFolderID: folderID,
    }),
}));

export default useFocusStore;
