"use client";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
// firebase
import { updateLikes } from "@/lib/firebase/firebaseCRUD";
// types
import { commentType } from "@/lib/types/comment";
// functions
import { convertTimestamp } from "@/lib/functions/convertTimestamp";
// Icons & Images
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
interface CommentProps {
  comment: commentType;
}
const Comment = ({ comment }: CommentProps): ReactNode => {
  const router = useRouter();
  const time = convertTimestamp(comment.timeStamp);
  // States
  const [isLikesHovered, setIsLikesHovered] = useState<boolean>(false);
  // Functions
  const likeClickhandler = async () => {
    await updateLikes(comment.id, comment.likes);
    router.refresh();
  };

  return (
    <li
      key={comment.id}
      className="w-full h-1/4 flex justify-start items-center"
    >
      <span className="h-full w-[20%] flex items-center">{time}</span>
      <span className="h-full flex-1 flex items-center">
        {comment.contents}
      </span>
      <span
        className="h-full w-10 flex gap-2"
        onMouseOut={() => setIsLikesHovered(false)}
        onMouseOver={() => setIsLikesHovered(true)}
      >
        {isLikesHovered ? (
          <FaThumbsUp onClick={likeClickhandler} />
        ) : (
          <FaRegThumbsUp />
        )}
        {comment.likes}
      </span>
    </li>
  );
};

export default Comment;
