import React, { ReactNode, useEffect } from "react";
import { commentType, initComment } from "@/lib/templates/Comment";
import data from "@/public/data/data.json";
import { convertTimestamp } from "@/lib/functions/converTimestamp";
import { addComment } from "@/lib/firebase/firebaseCRUD";
import AddComment from "./UI/AddComment";
import { postType } from "@/lib/templates/post";

interface TerminalProps {
  post: postType;
  commentList: commentType[];
}

const Terminal = ({ post, commentList }: TerminalProps): ReactNode => {
  console.log(commentList);

  const comments = commentList.map((comment) => {
    const time = convertTimestamp(comment.timeStamp);
    return (
      <li className="w-full h-1/4 flex justify-start items-center">
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
    <div className="w-full px-2 h-1/5 absolute bottom-0 border-t-1 border-solid border-[#3E3E3E]">
      <div className="w-full flex items-center h-1/5">
        Comments {commentList.length}
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
