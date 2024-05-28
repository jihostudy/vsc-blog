// firebase
import { db } from "./firebaseConfig";
import { collection } from "firebase/firestore";
// type
import { postType } from "../templates/post";
const getCollection = (collectionName: "posts" | "folders") =>
  collection(db, collectionName);

// Create
export const addPost = async (post: postType) => {};

// Read

// Update

// Delete
