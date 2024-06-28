"use client";
import React, { ReactNode, useEffect, useState } from "react";
// Images & Icons
import Select, { SelectChangeEvent } from "@mui/material/Select";
// Type
import { commentType, initComment } from "@/lib/types/comment";
import { TextField } from "@mui/material";
import { postType } from "@/lib/types/post";
import { addComment } from "@/lib/firebase/firebaseCRUD";
import delayTimeout from "@/lib/functions/asyncTimeout";
import { useRouter } from "next/navigation";

interface AddCommentProps {
  post: postType;
}
const AddComment = ({ post }: AddCommentProps): ReactNode => {
  const router = useRouter();
  // states
  const [newComment, setNewComment] = useState<commentType>({
    ...initComment,
    postID: post.id,
  });

  // functions
  const handleContentChange = (value: string) => {
    setNewComment((prev) => ({
      ...prev,
      contents: value,
    }));
  };
  const submitHandler = async () => {
    try {
      const comment: commentType = {
        ...newComment,
        timeStamp: new Date(),
      };
      const res = await addComment(comment); // DB는 folderType 넘겨주기
      delayTimeout(1000);
      router.refresh();
    } catch (error) {
      console.log("Error occured on client addFolder", error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex justify-start items-center h-1/5 mt-4"
    >
      <TextField
        id="standard-basic"
        type="text"
        placeholder="Add Comment"
        variant="standard"
        sx={{
          input: { color: "white" },
          width: "100%",
          "& .MuiInput-underline:before": { borderBottomColor: "white" },
          "& .MuiInput-underline:after": { borderBottomColor: "white" },
          marginBottom: "0.5rem",
        }}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        onChange={(e) => handleContentChange(e.target.value)}
      />
    </form>
  );
};

export default AddComment;
