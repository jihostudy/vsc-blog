"use client";

import React, { ReactNode, useEffect, useState } from "react";
// Firebase
import { addPost } from "@/lib/firebase/firebaseCRUD";
// Type
import { postType } from "@/lib/templates/post";
//Images & Icons
import { Button } from "@nextui-org/react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import delayTimeout from "@/lib/functions/asyncTimeout";
import useFolderState from "@/lib/context/folderStore";

interface SubmitBtnProps {
  newPost: postType;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: "1rem",
};

const AddPostBtn = ({ newPost }: SubmitBtnProps): ReactNode => {
  const router = useRouter();
  // States
  const [open, setOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { folderState, setFolderState } = useFolderState();

  const selectedFolder: string | undefined =
    newPost.folderID === ""
      ? folderState.find((folder) => folder.id === newPost.id)?.folderName
      : "Root";

  //functions
  // Submit
  const submitHandler = async (submit: boolean): Promise<undefined> => {
    if (submit === true) {
      try {
        const data: postType = {
          ...newPost,
          timeStamp: new Date(), // 현재 시간
        };

        setIsSaving(true);
        addPost(data);

        // customRevalidateTag("notice");
        await delayTimeout(1000);
        // const nextPath: Path = "/notification?page=1"; // 해당 글로 이동
        router.push("/");
        router.refresh();
      } catch (error) {
        console.log("Error Occured on Submitting!", error);
      }
    } else if (submit === false) {
      handleClose();
    }
  };

  return (
    <>
      <Button
        color="primary"
        variant="solid"
        className="fixed bottom-4 right-4"
        onClick={handleOpen}
      >
        Submit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isSaving ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                저장 중입니다
              </Typography>
              <CircularProgress />
            </>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Post?
              </Typography>

              <div className="flex w-full items-center justify-evenly">
                <Button
                  color="primary"
                  variant="bordered"
                  onClick={() => submitHandler(true)}
                >
                  Yes
                </Button>
                <Button
                  color="danger"
                  variant="bordered"
                  onClick={() => submitHandler(false)}
                >
                  No
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AddPostBtn;
