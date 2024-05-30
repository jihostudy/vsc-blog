import { tabPostType } from "@/lib/templates/post";
import React, { ReactNode } from "react";

interface PostDisplay {
  displayPost: tabPostType;
}
const PostDisplay = ({ displayPost }: PostDisplay): ReactNode => {
  console.log("displayPost: ", displayPost);

  return (
    <div className="w-full mt-9 h-full flex justify-start items-center">
      {displayPost ? displayPost.contents : ""}
    </div>
  );
};

export default PostDisplay;
