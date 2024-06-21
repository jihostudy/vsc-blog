"use client";

import { deletePost } from "@/lib/firebase/firebaseCRUD";
//######################################################
//########################PHASE2########################
//######################################################

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import useIsEditState from "@/lib/context/isEditStore";

const ToolBox = ({ className }: { className: string }): ReactNode => {
  const router = useRouter();
  const postId = usePathname().split("/")[2];
  const { setIsEditState } = useIsEditState();

  const handleEdit = () => {
    setIsEditState(postId);
    router.replace(`/newPost`);
  };

  const handleDelete = async () => {
    deletePost(postId).then(() => {
      router.replace("/");
    });
  };
  return (
    <div className={className}>
      <Popover placement="top" showArrow offset={10}>
        <PopoverTrigger>
          <Button color="primary">Manage Post</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Button
                  defaultValue="80%"
                  size="sm"
                  variant="bordered"
                  onClick={handleEdit}
                >
                  수정
                </Button>
                <Button
                  defaultValue="80%"
                  size="sm"
                  variant="bordered"
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ToolBox;

//######################################################
//########################PHASE2########################
//######################################################
