export interface PatientRecord {
  id: string;
  title: string;
  type: string;
  doctor: {
    id: string;
    name: string;
    lastname: string;
  };
  comment: string;
  image: string;
  patientId: string;
}
