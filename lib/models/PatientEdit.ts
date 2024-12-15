import { PatientCreate } from "./PatientCreate";

export type PatientEdit = Omit<PatientCreate, "dni" | "name" | "lastname"> & {
  id: string;
}
