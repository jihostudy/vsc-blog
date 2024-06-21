import React, { ReactNode, useEffect } from "react";
import { commentType, initComment } from "@/lib/templates/comment";
import { convertTimestamp } from "@/lib/functions/convertTimestamp";
import { addComment } from "@/lib/firebase/firebaseCRUD";
import AddComment from "../UI/AddComment";
import { postType } from "@/lib/templates/post";

interface TerminalProps {
  post: postType;
  commentList: commentType[];
}

const Terminal = ({ post, commentList }: TerminalProps): ReactNode => {
  console.log(commentList);
  const sortedComments = commentList.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime());
  const comments = sortedComments.map((comment) => {
    const time = convertTimestamp(comment.timeStamp);
    return (
      <li
        key={comment.id}
        className="w-full h-1/4 flex justify-start items-center"
      >
        <span className="h-full w-[20%] flex items-center">{time}</span>
        <span className="h-full w-[80%] flex items-center">
          {comment.contents}
        </span>
      </li>
    );
  });

  // addComment({
  //   ...initComment,
  //   postID: "hT3NzQ5ZMXkILKnSfrOh",
  //   contents: "너무 유익해요~",
  //   timeStamp: new Date(),
  // });

  return (
    <div className="w-full px-2 h-1/5 border-t-1 border-solid border-[#3E3E3E] bg-post">
      <div className="w-full flex items-center h-1/5">
        {commentList.length} Comments 
      </div>
      <ul className="w-full h-4/5  overflow-y-auto">
        {comments}
        <AddComment post={post} />
      </ul>

      {/* <div>Write Comment</div> */}
    </div>
  );
};

export default Terminal;
