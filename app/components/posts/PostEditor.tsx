"use client";
import React, {
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
// Icons & Images
// Type
import { postType, initPost } from "@/lib/templates/post";
import AddPostBtn from "../UI/AddPostBtn";
import useFocusStore from "@/lib/context/focusStore";
import { clientFolderType, folderType } from "@/lib/templates/folder";
import usePostStore from "@/lib/context/postStore";
import useFolderState from "@/lib/context/folderStore";
import SelectFolderBtn from "@/app/components/UI/SelectFolderBtn";
import useIsEditState from "@/lib/context/isEditStore";

interface PostEditorProps {
  posts: postType[];
  folders: folderType[];
}
const PostEditor = ({ posts, folders }: PostEditorProps): ReactNode => {

//######################################################
//########################PHASE2########################
//######################################################
  const { isEditing, postId } = useIsEditState();
  console.log(folders)
  const editingPost: postType|undefined = posts.find(post => post.id == postId);

  // State
  const { postState, setPostState } = usePostStore();
  const { folderState, setFolderState } = useFolderState();
  const { focusedSupFolderID: focusedSupFolderID } = useFocusStore();

  const initialPost:postType = isEditing && editingPost ? {
    id: editingPost.id, // 파베 받은 data
    contents: editingPost.contents,
    timeStamp: new Date(editingPost.timeStamp),
    title: editingPost.title,
    viewCount: editingPost.viewCount,
    folderID: editingPost.folderID,
  } : initPost;

  const [newPost, setNewPost] = useState<postType>(initialPost);
//######################################################
//########################PHASE2########################
//######################################################
  const [maxLineNumber, setMaxLineNumber] = useState<number>(1);
  // Ref
  const lineNumberRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };
  // Data
  let lineContent: string = "";
  for (let i = 1; i <= maxLineNumber; i++) {
    lineContent += i + "\n";
  }

  useEffect(() => {
    setPostState(posts);
    const clientFolderState: clientFolderType[] = folders.map((folder) => {
      const wasItOpen: boolean = folderState.find(
        (provFolder) => provFolder.id === folder.id
      )?.isOpen
        ? true
        : false;
      return {
        ...folder,
        isOpen: wasItOpen,
      };
    });
    setFolderState(clientFolderState);

    // 초기설정
    !isEditing && setNewPost((prev) => ({
      ...prev,
      folderID: focusedSupFolderID,
    }));
  }, []);
  // functions
  const handleContentChange = (contents: string): void => {
    setMaxLineNumber(contents.split("\n").length);

    setNewPost((prev) => ({
      ...prev,
      contents,
    }));
  };
  const handleTitleChange = (title: string): void => {
    setNewPost((prev) => ({
      ...prev,
      title,
    }));
  };
  const handleFolderChange = (folderID: string): void => {
    setNewPost((prev) => ({
      ...prev,
      folderID,
    }));
  };
  // Sync scroll positions
  useEffect(() => {
    const syncScroll = () => {
      if (lineNumberRef.current && contentRef.current) {
        lineNumberRef.current.scrollTop = contentRef.current.scrollTop;
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", syncScroll);
      return () => contentElement.removeEventListener("scroll", syncScroll);
    }
  }, []);

  return (
    <form
      className="w-[85vw] h-screen flex flex-col justify-start items-center text-white"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-start items-center w-full h-[10vh] ">
        {/* 제목 */}
        <textarea
          className="outline-none w-4/5 h-full bg-post p-4 text-2xl"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        <SelectFolderBtn
          folderId={newPost.folderID}
          handleFolderChange={handleFolderChange}
        />
      </div>
      {/* 줄번호 */}
      <div className="flex w-full h-full">
        <textarea
          ref={lineNumberRef}
          readOnly
          className="text-end w-16 h-full leading-relaxed outline-none bg-post pr-4 scrollbar-hide overflow-auto"
          value={lineContent}
        />
        {/* 글쓰기 */}
        <textarea
          ref={contentRef}
          className="outline-none w-full h-full leading-relaxed bg-post scrollbar-hide overflow-y-auto"
          value={newPost.contents}
          onChange={(e) => handleContentChange(e.target.value)}
        />
      </div>
      <AddPostBtn isEditing={isEditing} newPost={newPost} />
    </form>
  );
};

export default PostEditor;
