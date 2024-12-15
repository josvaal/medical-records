"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { Patient } from "@/lib/models/Patients";
import { PatientRecord } from "@/lib/models/PatientRecord";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddRecordDialog } from "./AddRecordDialog";
import { editFormSchema, EditRecordDialog } from "./EditRecordDialog";
import { DeleteRecordDialog } from "./DeleteRecordDialog";
import { patients } from "@/lib/patients";
import { patientRecords } from "@/lib/records";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "El título es obligatorio",
  }),
  type: z.string({
    required_error: "Selecciona el tipo de historia",
  }),
  comment: z.string().optional(),
  image: z.instanceof(File).refine((file) => file.size < 20000000, {
    message: "La imagen solo puede tener como maximo 20mb",
  }),
});

export type AddRecordFormData = z.infer<typeof formSchema>;

export default function Record({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = use(params);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "consultation",
      comment: "",
    },
  });

  const [patient, setpatient] = useState<Patient | null>(null);
  const [records, setrecords] = useState<PatientRecord[] | null>(null);
  const [buttondisabled, setbuttondisabled] = useState(false);

  function isById(patient: { id: string; }) {
    return patient.id === uid;
  }
  
  const fetchPatients = () => {
    const dbPatient = patients.find(isById);
  
    if (dbPatient) {
      const patient: Patient = {
        ...dbPatient
      };
      setpatient(patient);
    } else {
      console.log('Paciente no encontrado');
      setpatient(null);
    }
  };

  function recordById(record: { patientId: string }) {
    return record.patientId === uid;
  }
  
  const fetchRecords = async () => {
    const filteredRecords = patientRecords.filter(recordById);

    setrecords(filteredRecords);
  };

  useEffect(() => {
    fetchPatients();
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setbuttondisabled(true);
    console.log(values);
    setbuttondisabled(false);
    fetchRecords();
  }

  async function onEditSubmit(values: z.infer<typeof editFormSchema>) {
    setbuttondisabled(true);
    console.log(values)
    setbuttondisabled(false);
    fetchRecords();
  }

  async function handleDelete(id: string) {
    console.log(id)
    fetchRecords();
  }

  return (
    <div>
      {patient ? (
        <h2 className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Historial de{" "}
          <span className="text-blue-300">
            {patient.name} {patient.lastname}
          </span>
        </h2>
      ) : (
        <h2 className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          No se encuentra este usuario
        </h2>
      )}
      <br />
      <div className="flex justify-center gap-2">
        <AddRecordDialog
          buttondisabled={buttondisabled}
          form={form}
          onSubmit={onSubmit}
        />
      </div>
      <br />
      {(records ?? []).length == 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          <h1>No hay historias disponibles</h1>
          <br />
        </div>
      ) : null}
      {(records ?? []).map((record, index) => (
        <Card className="m-10" key={index}>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <h1 className="text-2xl font-bold">
                {record.title.toUpperCase()}
              </h1>
              <div className="flex gap-3">
                <EditRecordDialog
                  buttondisabled={buttondisabled}
                  onSubmit={onEditSubmit}
                  record={record}
                />
                <DeleteRecordDialog
                  handleDelete={handleDelete}
                  record={record}
                />
              </div>
            </CardTitle>
            <CardDescription>
              Doctor: {record.doctor.name} {record.doctor.lastname}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h5 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Tipo:
            </h5>
            <p className="leading-7 mt-2 mb-5">
              {record.type == "exam"
                ? "Exámen"
                : record.type == "analysis"
                ? "Análisis"
                : record.type == "consultation"
                ? "Consulta"
                : ""}
            </p>
            <h5 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Comentarios:
            </h5>
            <p className="leading-7 mt-2 mb-5">{record.comment}</p>
            <h5 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Imágenes adjuntas:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 p-10">
              <div className="flex justify-center items-center">
                <img src={record.image} className="h-[20rem]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
