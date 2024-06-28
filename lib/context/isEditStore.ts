import { create } from "zustand";
interface IsEditState {
  isEditing: boolean;
  postId: string | null;
  setIsEditState: (postId: string) => void;
  unsetIsEditState: () => void;
}
const useIsEditStore = create<IsEditState>((set) => ({
  isEditing: false,
  postId: null,
  setIsEditState: (postId: string) => {
    set({
      isEditing: true,
      postId: postId,
    });
  },
  unsetIsEditState: () => {
    set({
      isEditing: false,
      postId: null,
    });
  },
}));

export default useIsEditStore;
