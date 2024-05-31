import { postType } from "./post";

export interface tabType extends postType {
  display: boolean;
}

export const initTab: tabType = {
  id: "", // 파베 받은 data
  contents: "",
  timeStamp: new Date(),
  title: "",
  viewCount: 0,
  folderName: "",
  display: true,
};
