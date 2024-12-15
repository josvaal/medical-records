import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { UserMetadata } from "./models/UserMetadata";
import { auth, firestore } from "./database";
import { User } from "firebase/auth";

export async function getMedicById(_uid: string): Promise<UserMetadata | null> {
  const q = query(collection(firestore, "user_metadata"), where("id", "==", _uid));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];

    const {
      dni,
      id,
      email,
      firstName,
      lastName,
      phone,
      profession,
      direction
    } = docSnap.data();

    const userMetadata: UserMetadata = {
      email,
      dni,
      firstName,
      lastName,
      phone,
      profession,
      direction,
      id,
    };

    return userMetadata;
  } else {
    return null;
  }
}

export async function getMedic(): Promise<UserMetadata | null> {

  const user: User | null = auth.currentUser

  if (!user) {
    return null
  }

  const q = query(collection(firestore, "user_metadata"), where("email", "==", user.email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null
  }

  const docSnap = querySnapshot.docs[0];

  const {
    dni,
    id,
    email,
    firstName,
    lastName,
    phone,
    profession,
    direction
  } = docSnap.data();

  const userMetadata: UserMetadata = {
    email,
    dni,
    firstName,
    lastName,
    phone,
    profession,
    direction,
    id,
  };

  return userMetadata;
}

export async function updateMedic(medic: any): Promise<void> {
  const user = auth.currentUser

  if (!user) {
    console.log("User not found")
  }

  const q = query(collection(firestore, "user_metadata"), where("email", "==", user?.email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Empty snapshot")
  }

  const docSnap = querySnapshot.docs[0];

  await updateDoc(doc(firestore, "user_metadata", docSnap.id), {
    ...medic
  })
}
