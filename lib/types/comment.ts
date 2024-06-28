export interface commentType {
  id: string;
  postID: string;
  contents: string;
  timeStamp: Date;
  likes: number;
}
export const initComment: commentType = {
  id: "",
  postID: "",
  contents: "",
  timeStamp: new Date(),
  likes: 0,
};
