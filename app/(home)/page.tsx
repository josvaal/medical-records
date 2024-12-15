"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPatients, updatePatient } from "@/lib/patientMethods";
import { Patients } from "@/lib/models/Patients";
import { PatientDialog } from "./PatientDialog";
import { z } from "zod";
import { EditPatientForm } from "./EditPatientForm";
import { PatientEdit } from "@/lib/models/PatientEdit";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  phone: z
    .string()
    .min(9, { message: "El número de celular debe tener al menos 9 dígitos" }),
  address: z
    .string()
    .min(5, { message: "La dirección debe tener más de 5 caracteres" }),
  id: z.string(),
});

export default function Home() {
  const [patients, setpatients] = useState<Patients[] | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fetchPatients = async () => {
    try {
      const dbPatients = await getPatients();
      if (dbPatients) {
        setpatients(dbPatients);
      } else {
        console.log("No patients found");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setButtonDisabled(true);

    const newPatient: PatientEdit = {
      id: values.id,
      email: values.email,
      address: values.address,
      phone: values.phone,
    };

    await updatePatient(newPatient);

    fetchPatients();
    setButtonDisabled(false);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10vh)]">
      {(patients ?? []).length == 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          <h1>No hay pacientes agregados</h1>
          <br />
        </div>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
        {(patients ?? []).map((patient: Patients) => (
          <Card key={patient.id} className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>
                <Link href={`/${patient.id}`}>
                  {patient.name} {patient.lastname}
                </Link>
              </CardTitle>
              <CardDescription>{patient.dni}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end items-center gap-3">
              <PatientDialog patient={patient} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {patient.name} {patient.lastname}
                    </DialogTitle>
                    <DialogDescription>Rellena los campos</DialogDescription>
                  </DialogHeader>
                  <EditPatientForm
                    patient={patient}
                    onSubmit={onSubmit}
                    buttonDisabled={buttonDisabled}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
