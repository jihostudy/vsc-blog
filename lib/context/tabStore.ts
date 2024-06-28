import { create } from "zustand";
// type
import { postType } from "../types/post";
interface tabState {
  tabState: postType[];
  setTabState: (
    type: "open" | "close" | "navigate",
    clickedTab: postType
  ) => void;
}
const useTabStore = create<tabState>((set) => ({
  tabState: [],
  setTabState: (type: "open" | "close" | "navigate", clickedTab: postType) =>
    set((state) => {
      const tabList: postType[] = state.tabState;
      if (type === "open") {
        // 존재성 확인
        const check_existence = tabList.findIndex(
          (tab) => tab.id === clickedTab.id
        );
        // Tab 추가
        if (check_existence === -1) {
          const newTabList = [...tabList, clickedTab];

          return { tabState: newTabList };
        }
      }
      // 닫기
      else if (type === "close") {
        const newTabList: postType[] = tabList.filter(
          (tab) => tab.id !== clickedTab.id
        );
        return { tabState: newTabList };
      }
      // 움직이기
      // else if (type === "navigate") {
      //   const newTabList: postType[] = tabList.map((tab) => {
      //     if (tab.id === clickedTab.id) {
      //       return {
      //         ...tab,
      //         display: true,
      //       };
      //     }
      //     return {
      //       ...tab,
      //       display: false,
      //     };
      //   });
      //   return { tabState: newTabList };
      // }
      return state;
    }),
}));

export default useTabStore;
