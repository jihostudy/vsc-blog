"use client";
import { ReactNode, useEffect, useState } from "react";
// components
import Post from "./components/Post";
// Firebase
import { getAllPosts } from "@/lib/firebase/firebaseCRUD";
// type
import { postType } from "@/lib/templates/post";
// context
import usePostStore from "@/lib/context/postStore";

const Home = (): ReactNode => {
  // State Data
  const { setPostState } = usePostStore();

  // functions
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPosts();
      setPostState(data as postType[]);
    };

    fetchPosts();
  }, []);

  return (
    <main className="relative h-screen w-[80vw] flex justify-start items-center">
      <Post className="w-full bg-post h-screen text-white overflow-y-hidden" />
    </main>
  );
};
export default Home;

// export async function generateMetadata() {
//   return {
//     title: "VS Code Blog",
//     openGraph: {
//       // images: posterImage
//     },
//   };
// }
