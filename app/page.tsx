import { ReactNode, useEffect, useState } from "react";
// components
import Greetings from "@/app/components/Greetings";
// Firebase
import { getAllFolders, getAllPosts } from "@/lib/firebase/firebaseCRUD";
// type
import { postType } from "@/lib/templates/post";
import { NextUIProvider } from "@nextui-org/react";
import { NextUIProviders } from "@/lib/providers/NextUIProvider";
import { folderType } from "@/lib/templates/folder";

const Home = async (): Promise<ReactNode> => {
  const posts = await getAllPosts();
  const folders = await getAllFolders();
  return (
    <NextUIProviders>
      <main className="relative h-screen w-[80vw] flex justify-start items-center">
        {/* 최초 화면 */}
        <Greetings
          posts={posts as postType[]}
          folders={folders as folderType[]}
        />
      </main>
    </NextUIProviders>
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
