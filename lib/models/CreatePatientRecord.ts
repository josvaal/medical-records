export interface CreatePatientRecord {
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
