import { create } from "zustand";
// type
import { tabType } from "../templates/tab";
import { postType } from "../templates/post";
interface tabState {
  tabState: tabType[];
  setTabState: (
    type: "open" | "close" | "navigate",
    clickedTab: postType | tabType
  ) => void;
}
const useTabStore = create<tabState>((set) => ({
  tabState: [],
  setTabState: (
    type: "open" | "close" | "navigate",
    clickedTab: postType | tabType
  ) =>
    set((state) => {
      const tabList: tabType[] = state.tabState;
      if (type === "open") {
        // 존재성 확인
        const check_existence = tabList.findIndex(
          (tab) => tab.id === clickedTab.id
        );
        // Tab 추가
        if (check_existence === -1) {
          // 새로운 Tab
          const newClickedTab: tabType = {
            ...clickedTab,
            display: true,
          };
          // 기존 Tab
          let newTabList: tabType[] = tabList.map((tab) => ({
            ...tab,
            display: false,
          }));
          newTabList = [...newTabList, newClickedTab];

          return { tabState: newTabList };
        }
      }
      // 닫기
      else if (type === "close") {
        const newTabList: tabType[] = tabList.filter(
          (tab) => tab.id !== clickedTab.id
        );
        return { tabState: newTabList };
      }
      // 움직이기
      else if (type === "navigate") {
        const newTabList: tabType[] = tabList.map((tab) => {
          if (tab.id === clickedTab.id) {
            return {
              ...tab,
              display: true,
            };
          }
          return {
            ...tab,
            display: false,
          };
        });
        return { tabState: newTabList };
      }
      return state;
    }),
}));

export default useTabStore;
