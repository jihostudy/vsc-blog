import { create } from "zustand";
// type
import { initPost, postType } from "../templates/post";

interface PostState {
  postState: postType[];
  setPostState: (posts: postType[]) => void;
}
const usePostStore = create<PostState>((set) => ({
  postState: [initPost],
  setPostState: (posts: postType[]) =>
    set({
      postState: posts,
    }),
}));

export default usePostStore;
