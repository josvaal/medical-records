import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { PatientRecord } from "./models/PatientRecord";
import { firestore } from "./database";
import { CreatePatientRecord } from "./models/CreatePatientRecord";
import { EditPatientRecord } from "./models/EditPatientRecord";

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
    const { title, type, doctor, comment, image, patientId } = doc.data();

    const record: PatientRecord = {
      id: doc.id,
      type,
      doctor: {
        name: doctor.name,
        lastname: doctor.lastname,
        id: doctor.id
      },
      comment,
      image,
      patientId,
      title,
    };

    records.push(record);
  });

  return records;
}

export async function saveRecord(record: CreatePatientRecord): Promise<void> {
  const docref = await addDoc(collection(firestore, "records"), record)
  console.log(`Historia medica subida a: ${docref.id}`)
}

export async function deleteRecord(id: string): Promise<void> {
  await deleteDoc(doc(firestore, "records", id))
}

export async function updateRecord(record: EditPatientRecord): Promise<void> {
  const recordRef = doc(firestore, "records", record.id)
  await updateDoc(recordRef, {
    ...record
  });
}
