import { collection, getDocs, query, where } from "firebase/firestore";
import { PatientRecord } from "./models/PatientRecord";
import { firestore } from "./database";

export async function getRecordsByPatientId(
  id: string,
): Promise<PatientRecord[] | null> {
  const q = query(
    collection(firestore, "records"),
    where("patientId", "==", id),
  );

  const querySnapshot = await getDocs(q);
  const records: PatientRecord[] = [];

  querySnapshot.forEach((doc) => {
    const { type, doctor, comment, images } = doc.data();

    const record: PatientRecord = {
      id: doc.id,
      type: type,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        lastname: doctor.lastname,
      },
      comment: comment,
      images: images,
    };

    records.push(record);
  });

  return records;
}
