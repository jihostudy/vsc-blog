export interface commentType {
  id: string;
  contents: string;
  timeStamp: Date;
  icon: string;
}

export const initComment: commentType = {
  id: "",
  contents: "",
  timeStamp: new Date(),
  icon: "laugh",
};
