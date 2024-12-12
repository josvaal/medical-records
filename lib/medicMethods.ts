import { collection, getDocs, query, where } from "firebase/firestore";
import { UserMetadata } from "./models/UserMetadata";
import { firestore } from "./database";

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

