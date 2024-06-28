//######################################################
//########################PHASE2########################
//######################################################

export interface commentType {
  id: string;
  postID: string;
  contents: string;
  timeStamp: Date;
  ttabong: number;
}
export const initComment: commentType = {
  id: "",
  postID: "",
  contents: "",
  timeStamp: new Date(),
  ttabong: 0,
};

//######################################################
//########################PHASE2########################
//######################################################