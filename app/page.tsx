import { ReactNode } from "react";
// components
import PostList from "./components/PostList";
import Post from "./components/Post";

export default function Home(): ReactNode {
  return (
    <main className="relative h-screen w-screen flex justify-start items-center">
      {/* post구조 */}
      <PostList className="w-1/5 bg-postlist h-screen text-white" />
      {/* 글보기 */}
      <Post className="w-full bg-post h-screen" />
    </main>
  );
}

export async function generateMetadata() {
  return {
    title: "VS Code Blog",
    openGraph: {
      // images: posterImage
    },
  };
}
