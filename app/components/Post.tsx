import React, { ReactNode } from "react";
//

interface PostProps {
  className: string;
}
const Post = ({ className }: PostProps): ReactNode => {
  return <div className={className}>Post</div>;
};

export default Post;
