import { ReactNode, useEffect, useState } from "react";
// components
import Greetings from "@/app/components/Greetings";
// Firebase
import { getAllPosts } from "@/lib/firebase/firebaseCRUD";
// type
import { postType } from "@/lib/templates/post";
import { NextUIProvider } from "@nextui-org/react";
import { NextUIProviders } from "@/lib/providers/NextUIProvider";
// context
// import usePostStore from "@/lib/context/postStore";

// const fetchData = async (): Promise<postType[] | undefined> => {
//   console.log("Fetching data");

//   try {
//     const data = await ();
//     // const data = await fetch(`${baseUrl}/api/getNotice`, {
//     //   next: { revalidate: 10, tags: ["notice"] }, //revalidate every 60 seconds
//     // });

//     return data as postType[];
//   } catch (error) {
//     console.log(error);
//   }
// };

const Home = async (): Promise<ReactNode> => {
  const posts = await getAllPosts();
  console.log("Fetched from home", posts);

  // State Data
  // const { setPostState } = usePostStore();

  // functions
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const data = await getAllPosts();
  //     setPostState(data as postType[]);
  //   };

  //   fetchPosts();
  // }, []);

  return (
    <NextUIProviders>
      <main className="relative h-screen w-[80vw] flex justify-start items-center">
        {/* 최초 화면 */}
        <Greetings
          posts={posts as postType[]}
          className="w-full bg-post h-screen text-white overflow-y-hidden text-4xl"
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
