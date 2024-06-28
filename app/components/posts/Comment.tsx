"use client";
//######################################################
//########################PHASE2########################
//######################################################
import { increaseTtabong } from "@/lib/firebase/firebaseCRUD";
import { convertTimestamp } from "@/lib/functions/convertTimestamp";
import { commentType } from "@/lib/templates/comment";
import { ReactNode, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
const Comment = ({ comment }: { comment: commentType }): ReactNode => {
  const [isThumbHovered, setIsThumbHovered] = useState<boolean>(false);
  const time = convertTimestamp(comment.timeStamp);
  const onTtabongClickhandler = async () => {
    await increaseTtabong(comment.id, comment.ttabong);
    window.location.reload();
  }

  return (
    <li
      key={comment.id}
      className="w-full h-1/4 flex justify-start items-center"
    >
      <span className="h-full w-[20%] flex items-center">{time}</span>
      <span className="h-full flex-1 flex items-center">
        {comment.contents}
      </span>
      <span className="h-full w-10 flex gap-2"
        onMouseOut={() => setIsThumbHovered(false)} 
        onMouseOver={() => setIsThumbHovered(true)}>
        {isThumbHovered ? (
          <FaThumbsUp onClick={onTtabongClickhandler}/>
        ) : (
          <FaRegThumbsUp  />
        )}
        {comment.ttabong}
      </span>
    </li>
  );
};

export default Comment;

//######################################################
//########################PHASE2########################
//######################################################