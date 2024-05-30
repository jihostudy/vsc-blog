"use client";
import { ReactNode, useEffect, useState } from "react";
// components
import PostList from "./components/PostList";
import Post from "./components/Post";
// Firebase
import { getAllPosts } from "@/lib/firebase/firebaseCRUD";
// type
import { postType, tabPostType } from "@/lib/templates/post";
const Home = (): ReactNode => {
  // State Data
  const [posts, setPosts] = useState<postType[] | null>([]);
  const [tabPostList, setTabPostList] = useState<tabPostType[]>([]);

  // functions
  const handleTabPostList = (
    type: "open" | "close",
    clickedTabPost: postType | tabPostType
  ): void => {
    if (type === "open") {
      // 추가 (존재하지 않는 경우)
      const check_existence = tabPostList.findIndex(
        (post) => post.id === clickedTabPost.id
      );

      if (check_existence === -1) {
        const newClickedTabPost: tabPostType = {
          ...clickedTabPost,
          display: true,
        };
        let newTabPostList: tabPostType[] = tabPostList.map((tabPost) => ({
          ...tabPost,
          display: false,
        }));
        newTabPostList = [...newTabPostList, newClickedTabPost];

        setTabPostList(newTabPostList);
      }
    } else if (type === "close") {
      const newTabPostList: tabPostType[] = tabPostList.filter(
        (post) => post.id !== clickedTabPost.id
      );
      setTabPostList(newTabPostList);
    }
  };
  // 보여주는 tab 바꾸기
  const handleDisplayPost = (post: tabPostType) => {
    const newTabPostList: tabPostType[] = tabPostList.map((tabPost) => {
      if (tabPost.id === post.id) {
        return {
          ...tabPost,
          display: true,
        };
      }
      return {
        ...tabPost,
        display: false,
      };
    });
    setTabPostList(newTabPostList);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <main className="relative h-screen w-screen flex justify-start items-center">
      {/* post구조 */}
      <PostList
        posts={posts}
        handleTabPostList={handleTabPostList}
        className="w-1/5 bg-postlist h-screen text-white"
      />
      {/* 글보기 */}
      <Post
        tabPostList={tabPostList}
        handleTabPostList={handleTabPostList}
        handleDisplayPost={handleDisplayPost}
        className="w-full bg-post h-screen text-white overflow-y-hidden"
      />
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
