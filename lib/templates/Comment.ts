export interface commentType {
  id: string;
  postID: string;
  contents: string;
  timeStamp: Date;
}
export const initComment: commentType = {
  id: "",
  postID: "",
  contents: "",
  timeStamp: new Date(),
};
