export interface PatientRecord {
  id: string;
  type: string;
  doctor: {
    id: string;
    name: string;
    lastname: string;
  };
  comment: string;
  image: string;
}
