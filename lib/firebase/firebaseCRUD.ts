// firebase
import { db } from "./firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
// type
import { postType } from "../templates/post";
import { folderType } from "../templates/folder";
import { commentType } from "../templates/comment";

const getCollection = (collectionName: "posts" | "folders" | "comments") =>
  collection(db, collectionName);

// Create
export const addPost = async (post: postType) => {
  const { id, ...data } = post;
  try {
    const res = await getDocs(getCollection("posts"));
    const exists: boolean = res.docs.some((doc) => doc.id === id);
    // 글 수정
    if (exists) {
      const modify_doc = await updateDoc(doc(db, "posts", id), data);
    }
    // 생성
    else {
      const new_doc = await addDoc(getCollection("posts"), data);
    }
  } catch (error) {
    console.log("Error occured on adding Post!", error);
  }
};

export const addFolder = async (folder: folderType) => {
  const { id, ...data } = folder;
  try {
    const res = await getDocs(getCollection("folders"));
    const exists: boolean = res.docs.some((doc) => doc.id === id);

    // 폴더 수정
    if (exists) {
      const modify_doc = await updateDoc(doc(db, "folders", id), data);
      console.log("folder modified");
    }
    // 생성
    else {
      const new_doc = await addDoc(getCollection("folders"), data);
      console.log("folder added");
    }
  } catch (error) {
    console.log("Error occured on adding Folders!", error);
  }
};

export const addComment = async (comment: commentType) => {
  const { id, ...data } = comment;
  try {
    const res = await getDocs(getCollection("comments"));
    const exists: boolean = res.docs.some((doc) => doc.id === id);

    // 댓글 수정
    if (exists) {
      const modify_doc = await updateDoc(doc(db, "comments", id), data);
    }
    // 생성
    else {
      const new_doc = await addDoc(getCollection("comments"), data);
    }
  } catch (error) {
    console.log("Error occured on adding comments!", error);
  }
};
// Read
export const getAllPosts = async (): Promise<postType[]> => {
  try {
    const res = await getDocs(getCollection("posts"));
    const dataList: postType[] = res.docs.map((doc) => {
      const { timeStamp } = doc.data();
      return {
        ...(doc.data() as postType),
        id: doc.id,
        timeStamp: timeStamp.toDate(),
      };
    });
    console.log(dataList);

    return dataList;
    // const sorted_arr = sortNotices(datas);
    // return sorted_arr;
  } catch (error) {
    console.log(`error occured on firebaseCRUD: ${error}`);
    return [];
  }
};

export const getAllFolders = async (): Promise<folderType[]> => {
  try {
    const res = await getDocs(getCollection("folders"));
    const dataList: folderType[] = res.docs.map((doc) => {
      return {
        ...(doc.data() as folderType),
        id: doc.id,
      };
    });
    console.log("Fetched folders");

    console.log(dataList);

    return dataList;
  } catch (error) {
    console.log(`error occured on firebaseCRUD: ${error}`);
    return [];
  }
};

export const getAllComments = async (): Promise<commentType[]> => {
  try {
    const res = await getDocs(getCollection("comments"));
    const dataList: commentType[] = res.docs.map((doc) => {
      const { timeStamp } = doc.data();

      return {
        ...(doc.data() as commentType),
        id: doc.id,
        timeStamp: timeStamp.toDate(),
      };
    });
    console.log("Fetched comments");

    console.log(dataList);

    return dataList;
  } catch (error) {
    console.log(`error occured on firebaseCRUD: ${error}`);
    return [];
  }
};

// Update
export const updateViewCount = async (postID: string) => {
  try {
    await updateDoc(doc(db, "posts", postID), {
      viewCount: increment(1),
    });
  } catch (error) {
    console.log("Error updating view Count", error);
  }
};

// Delete

//######################################################
//########################PHASE2########################
//######################################################

export const deleteFolder = async (folderId: string) => {
  const allPosts: postType[] = await getAllPosts();

  //delete all posts in the folder
  Promise.all(
    allPosts.map(async (post) => {
      if (post.folderID == folderId) {
        await deletePost(post.id)
      }
    })
  );
  //delete folder
  await deleteDoc(doc(db, "folders", folderId));
};

export const deletePost = async (postId: string) => {
  //delete single post
  await deleteDoc(doc(db, "posts", postId));
};

//Put

export const increaseTtabong = async (commentId: string, currentTtabong: number) => {
  await updateDoc(doc(db, "comments", commentId), {
    ttabong: ++currentTtabong
  });
}

//######################################################
//########################PHASE2########################
//######################################################
