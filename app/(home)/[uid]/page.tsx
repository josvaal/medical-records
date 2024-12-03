"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardPlus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Patients } from "@/lib/models/Patients";
import { getPatient } from "@/lib/patientMethods";

const patient = {
  name: "José Valentino",
  lastname: "Masías Castillo",
  dni: "76133536",
  avatar_url: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
};

const records = [
  {
    patient: "1",
    doctor: {
      id: "2",
      name: "Nombre",
      lastname: "Apellido",
    },
    type: "Examen",
    comment: "Examen médico rutinario",
    images: [
      "https://medicaelmarques.com/wp-content/uploads/2021/11/examen-medico-laboral.jpg",
      "https://examenesmedicosocupacionales.com.pe/wp-content/uploads/2023/03/que-estudios-se-realizan-en-un-examen-medico-preocupacional-medvida-salud.webp",
    ],
  },
  {
    patient: "1",
    doctor: {
      id: "2",
      name: "Nombre",
      lastname: "Apellido",
    },
    type: "Examen",
    comment: "Examen médico rutinario",
    images: [
      "https://medicaelmarques.com/wp-content/uploads/2021/11/examen-medico-laboral.jpg",
      "https://examenesmedicosocupacionales.com.pe/wp-content/uploads/2023/03/que-estudios-se-realizan-en-un-examen-medico-preocupacional-medvida-salud.webp",
    ],
  },
];

export default function Record({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = use(params);
  const [patient, setpatient] = useState<Patients | null>(null);
  console.log(uid);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const dbPatient = await getPatient(uid);
        if (dbPatient) {
          setpatient(dbPatient);
          console.log(dbPatient);
        } else {
          console.log("No patients found");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      {patient ? (
        <h2 className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Historial de {patient.name} {patient.lastname}
        </h2>
      ) : (
        <h2 className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          No se encuentra este usuario
        </h2>
      )}
      <br />
      <div className="flex justify-center gap-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona un filtro" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Información</SelectLabel>
              <SelectItem value="comment">Comentario</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              <SelectItem value="exam">Examen</SelectItem>
              <SelectItem value="consultation">Consulta</SelectItem>
              <SelectItem value="analysis">Análisis</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          placeholder="Buscar historial por filtro"
          className="w-[20rem]"
        />
        <Button size="icon" variant="outline">
          <ClipboardPlus />
        </Button>
      </div>
      <br />
      <div className="flex justify-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Añadir Historia</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir historia</DialogTitle>
              <DialogDescription>
                Rellena los campos necesarios para añadir una nueva historia
                médica
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="comment" className="text-right">
                  Comentarios
                </Label>
                <Textarea
                  id="comment"
                  defaultValue="Esto es un comentario sobre este examen, analisis, etc..."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pictures" className="text-right">
                  Imágenes
                </Label>
                <Input
                  id="pictures"
                  className="col-span-3"
                  type="file"
                  accept="image/*"
                  multiple
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full" type="submit">
                Añadir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <br />
      {records.map((record, index) => (
        <Card className="m-10" key={index}>
          <CardHeader>
            <CardTitle>{record.type}</CardTitle>
            <CardDescription>
              Doctor: {record.doctor.name} {record.doctor.lastname}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h5 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Comentarios:
            </h5>
            <p className="leading-7 mt-2 mb-5">{record.comment}</p>
            <h5 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Imágenes adjuntas:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 p-10">
              {record.images.map((image, index) => (
                <div className="flex justify-center items-center" key={index}>
                  <img src={image} className="h-[20rem]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
