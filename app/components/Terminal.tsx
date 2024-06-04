import React, { ReactNode } from "react";
import { commentType } from "@/lib/templates/Comment";
import data from "@/public/data/data.json";
import { convertTimestamp } from "@/lib/functions/converTimestamp";

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
  const comments = commentList.map((comment) => {
    return (
      <li className="w-full ">
        <span>{getIcon(comment.icon)}</span>
        <span>{comment.contents}</span>
        <span>{convertTimestamp(comment.timeStamp)}</span>
      </li>
    );
  });

  return (
    <div className="w-full px-2 h-1/5 absolute bottom-0 border-t-1 border-solid border-[#3E3E3E]">
      <p className="w-full py-4">Comments</p>
      {/* <ul>{comments}</ul> */}
    </div>
  );
};

export default Terminal;
