"use client";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "./database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserRegister } from "./models/UserRegister";
import { redirect } from "next/navigation";
import { UserLogin } from "./models/UserLogin";

export async function register(user: UserRegister): Promise<void> {
  const q = query(
    collection(firestore, "user_metadata"),
    where("dni", "==", user.dni),
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return;
  }

  await createUserWithEmailAndPassword(auth, user.email, user.password);

  const { password, repeatPassword, ...userData } = user;

  const docRef = await addDoc(collection(firestore, "user_metadata"), userData);
  console.log("Metadata subida a " + docRef.id);

  redirect("/")
}

export async function login(user: UserLogin): Promise<void> {
  const q = query(
    collection(firestore, "user_metadata"),
    where("dni", "==", user.dni),
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return;
  }

  const doc = querySnapshot.docs[0];
  const data = doc.data();

  await signInWithEmailAndPassword(auth, data.email, user.password);

  redirect("/")
}
