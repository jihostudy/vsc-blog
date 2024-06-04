"use client";
import React, { ReactNode } from "react";
// next
import Image from "next/image";
import { useRouter } from "next/navigation";
// images & icons
import logo from "@/public/images/vscode_white.svg";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CodeIcon from "@mui/icons-material/Code";
// constants
import { path } from "@/lib/templates/paths";
import Link from "next/link";

const NavBar = (): ReactNode => {
  // next
  const router = useRouter();
  // paths
  const mainPath: path = "/";
  const addPostPath: path = "/newPost";
  // style
  const li_className =
    "h-[10%] flex justify-center items-center cursor-pointer";
  return (
    <div className="z-10 flex flex-col justify-start items-center h-screen relative bg-navbar w-[5vw] text-white">
      <Link href={mainPath} className={li_className}>
        <Image
          className="p-2 h-1/2 aspect-square"
          src={logo}
          alt="vscode_image"
        />
      </Link>

      <ul className="px-2 w-full h-[95%]">
        <Link href={mainPath} className={li_className}>
          <CodeIcon />
        </Link>
        <Link href={addPostPath} className={li_className}>
          <PostAddIcon />
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
