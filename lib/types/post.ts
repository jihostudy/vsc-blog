export interface postType {
  id: string;
  contents: string;
  timeStamp: Date;
  title: string;
  viewCount: number;
  folderID: string;
}

export const initPost: postType = {
  id: "", // 파베 받은 data
  contents: "",
  timeStamp: new Date(),
  title: "",
  viewCount: 0,
  folderID: "",
};
