// firebase
import { db } from "./firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// type
import { postType } from "../templates/post";
import { folderType } from "../templates/folder";

const getCollection = (collectionName: "posts" | "folders") =>
  collection(db, collectionName);

// Create
export const addPost = async (post: postType) => {
  const { id, ...data } = post;
  try {
    const res = await getDocs(getCollection("posts"));
    const exists: boolean = res.docs.some((doc) => doc.id === id);
    // 수정
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
    console.log("Error?");

    // 폴더 수정
    if (exists) {
      const modify_doc = await updateDoc(doc(db, "folders", id), data);
    }
    // 생성
    else {
      const new_doc = await addDoc(getCollection("folders"), data);
    }
  } catch (error) {
    console.log("Error occured on adding Folders!", error);
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

// Update

// Delete
