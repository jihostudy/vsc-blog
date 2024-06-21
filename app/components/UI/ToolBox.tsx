//######################################################
//########################PHASE2########################
//######################################################

"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ReactNode } from "react";

const ToolBox = ({ className }: { className: string }): ReactNode => {
  return (
    <div className={className} >
      <Popover placement="top" showArrow offset={10}>
        <PopoverTrigger>
          <Button color="primary">Manage Post</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Button defaultValue="80%" size="sm" variant="bordered">
                  수정
                </Button>
                <Button defaultValue="80%" size="sm" variant="bordered">
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