"use client";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { PatientCreate } from "./models/PatientCreate";
import { Patients } from "./models/Patients";
import { firestore } from "./database";

export async function getPatients(): Promise<Patients[] | null> {
  const querySnapshot = await getDocs(collection(firestore, "patients"));

  const patients: Patients[] = [];

  querySnapshot.forEach((doc) => {
    const patient: Patients = {
      id: doc.id,
      ...doc.data(),
    };
    patients.push(patient);
  });

  return patients;
}

export async function addPatient(patient: PatientCreate): Promise<void> {
  const q = query(
    collection(firestore, "patients"),
    where("dni", "==", patient.dni),
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return;
  }

  const docRef = await addDoc(collection(firestore, "patients"), patient);
  console.log("Metadata subida a " + docRef.id);
}
