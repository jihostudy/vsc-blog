"use client";
import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
// images & icons
import VSCLogo from "@/public/icons/vscode_white.svg";
import SourceCodeIcon from "@/public/icons/source_control.png";
import AdminIcon from "@/public/icons/admin.png";

// constants
import { path } from "@/lib/templates/paths";
import Link from "next/link";
import Login from "./LoginModal";

const NavBar = (): ReactNode => {
  // next
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "") {
    console.log("Home");
  } else if (pathname === "/newPost") {
    console.log("newPost");
  } else if (pathname.includes("posts")) {
    console.log("posts");
  }
  // paths
  const mainPath: path = "/";
  const addPostPath: path = "/newPost";
  // style
  const li_className =
    "h-[6%] w-full flex justify-center items-center cursor-pointer my-4 box-content";
  const activeClassName = "border-l-2 border-white border-solid my-4";
  return (
    <div className="z-10 flex flex-col justify-start items-center h-screen relative bg-navbar w-[3vw] text-white">
      <Link href={mainPath} className={li_className}>
        <Image
          className="p-2 h-4/5 aspect-square"
          src={VSCLogo}
          alt="vscode_image"
        />
      </Link>

      <ul className="px-1 w-full h-[95%] flex flex-col items-center">
        <Link
          href={mainPath}
          className={`${li_className} ${
            pathname === mainPath || pathname.includes("posts")
              ? activeClassName
              : ""
          }`}
        >
          <Image
            className="w-full p-2"
            src={SourceCodeIcon}
            alt="source_control"
          />
        </Link>
        <Link
          href={addPostPath}
          className={`${li_className} ${
            pathname === addPostPath ? activeClassName : ""
          }`}
        >
          <Image className="w-full p-2" src={AdminIcon} alt="admin" />
        </Link>
        <Login className="w-full p-2 cursor-pointer" />
      </ul>
    </div>
  );
};

export default NavBar;
