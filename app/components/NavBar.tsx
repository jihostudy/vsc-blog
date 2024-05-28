"use client";
import React, { ReactNode } from "react";
// next
import Image from "next/image";
import { useRouter } from "next/navigation";
// images & icons
import logo from "@/public/images/vscode_white.svg";
// constants
import { path } from "@/lib/templates/paths";

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
    <div className="z-10 flex flex-col justify-start items-center h-screen relative bg-navbar w-[5%] text-white">
      <Image
        className="p-2 h-[5%] aspect-square"
        src={logo}
        alt="vscode_image"
      />
      <ul className="p-2 w-full h-[95%]">
        <li className={li_className} onClick={() => router.push(mainPath)}>
          File
        </li>
        <li className={li_className} onClick={() => router.push(addPostPath)}>
          작성하기
        </li>
        <li className={li_className}>통계</li>
      </ul>
    </div>
  );
};

export default NavBar;
