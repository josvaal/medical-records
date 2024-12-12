import { collection, getDocs, query, where } from "firebase/firestore";
import { PatientRecord } from "./models/PatientRecord";
import { firestore } from "./database";
import { CreatePatientRecord } from "./models/CreatePatientRecord";

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
    const { type, doctor, comment, image } = doc.data();

    const record: PatientRecord = {
      id: doc.id,
      type: type,
      doctor: {
        name: doctor.name,
        lastname: doctor.lastname,
        id: doctor.id
      },
      comment: comment,
      image: image,
    };

    records.push(record);
  });

  return records;
}

export async function saveRecord(createPatientRecord: CreatePatientRecord): Promise<void> {
  return
}
