import React, { ReactNode, useEffect } from "react";
import { commentType, initComment } from "@/lib/templates/Comment";
import data from "@/public/data/data.json";
import { convertTimestamp } from "@/lib/functions/converTimestamp";
import { addComment } from "@/lib/firebase/firebaseCRUD";

interface TerminalProps {
  commentList: commentType[];
}

// function
const getIcon = (icon: string) => {
  const commentIcons = data.commentIcon;
  if (icon === "laugh") return commentIcons.laugh;
  else if (icon === "horrible") return commentIcons.horrible;
  else if (icon === "angry") return commentIcons.angry;
  else if (icon === "love") return commentIcons.love;
  else if (icon === "error") return commentIcons.error;
  else if (icon === "exciting") return commentIcons.exciting;
  else if (icon === "idea") return commentIcons.idea;
};

const Terminal = ({ commentList }: TerminalProps): ReactNode => {
  console.log(commentList);

  const comments = commentList.map((comment) => {
    const time = convertTimestamp(comment.timeStamp);
    return (
      <li className="w-full h-1/4 flex justify-start items-center">
        <span className="w-[1%] mr-2 h-full">{getIcon(comment.icon)}</span>
        <span className="h-full w-[64%]">{comment.contents}</span>
        <span className="h-full w-[35%]">{time}</span>
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
      <p className="w-full flex items-center h-1/5">Comments</p>
      <ul className="w-full h-4/5  overflow-y-auto">{comments}</ul>
      {/* <div>Write Comment</div> */}
    </div>
  );
};

export default Terminal;
