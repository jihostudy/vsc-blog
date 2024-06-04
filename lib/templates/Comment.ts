export interface commentType {
  id: string;
  postID: string;
  contents: string;
  timeStamp: Date;
  icon: string;
}

export const initComment: commentType = {
  id: "",
  postID: "",
  contents: "",
  timeStamp: new Date(),
  icon: "laugh",
};
