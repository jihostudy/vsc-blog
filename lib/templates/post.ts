export interface postType {
  id: string;
  contents: string;
  timeStamp: Date;
  title: string;
  viewCount: number;
  folderName: string;
}

export const initPost = {
  id: "", // 파베 받은 data
  contents: "",
  timeStamp: new Date(),
  title: "",
  viewCount: 0,
  folderName: "",
};
