import React, { ReactNode, useEffect } from "react";
import { commentType, initComment } from "@/lib/types/comment";
import AddComment from "../UI/AddComment";
import { postType } from "@/lib/types/post";
import Comment from "./Comment";

interface TerminalProps {
  post: postType;
  commentList: commentType[];
}

const Terminal = ({ post, commentList }: TerminalProps): ReactNode => {
  console.log(commentList);
  const sortedComments = commentList.sort(
    (a, b) => a.timeStamp.getTime() - b.timeStamp.getTime()
  );
  const comments = sortedComments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  return (
    <div className="w-full px-2 h-1/5 border-t-1 border-solid border-[#3E3E3E] bg-post">
      <div className="w-4/5 flex items-center h-1/5">
        {commentList.length} Comments
      </div>
      <ul className="w-4/5 h-4/5  overflow-y-auto">
        {comments}
        <AddComment post={post} />
      </ul>
    </div>
  );
};

export default Terminal;
