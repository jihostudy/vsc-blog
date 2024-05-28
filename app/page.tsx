import { ReactNode } from "react";
// components
import PostList from "./components/PostList";
import Post from "./components/Post";
// Firebase
import { getAllPosts } from "@/lib/firebase/firebaseCRUD";

const Home = async (): Promise<ReactNode> => {
  const postData = getAllPosts();

  return (
    <main className="relative h-screen w-screen flex justify-start items-center">
      {/* post구조 */}
      <PostList className="w-1/5 bg-postlist h-screen text-white" />
      {/* 글보기 */}
      <Post className="w-full bg-post h-screen text-white overflow-y-hidden" />
    </main>
  );
};
export default Home;

export async function generateMetadata() {
  return {
    title: "VS Code Blog",
    openGraph: {
      // images: posterImage
    },
  };
}
