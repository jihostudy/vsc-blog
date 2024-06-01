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

// Update

// Delete
