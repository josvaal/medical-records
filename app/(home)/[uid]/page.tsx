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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { PatientRecord } from "@/lib/models/PatientRecord";
import { getRecordsByPatientId } from "@/lib/recordMehods";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreatePatientRecord } from "@/lib/models/CreatePatientRecord";
import { auth } from "@/lib/database";
import { UserMetadata } from "@/lib/models/UserMetadata";
import { getMedicById } from "@/lib/medicMethods";

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

  const [patient, setpatient] = useState<Patients | null>(null);
  const [records, setrecords] = useState<PatientRecord[] | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const dbPatient: Patients | null = await getPatient(uid);
        if (dbPatient) {
          setpatient(dbPatient);
        } else {
          console.log("No patients found");
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    const fetchRecords = async () => {
      try {
        const records: PatientRecord[] | null =
          await getRecordsByPatientId(uid);
        if (records) {
          setrecords(records);
        } else {
          console.log("Not records found");
        }
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };

    fetchPatients();
    fetchRecords();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: values.image
    })

    if (response.ok) {
      const data = await response.json();
      //console.log('Archivo guardado en:', data.filePath);

      const user = auth.currentUser;
      console.log(user?.uid)
      const medic: UserMetadata | null = await getMedicById(user?.uid ?? "")

      if (medic != null) {
        const patientRecord: CreatePatientRecord = {
          type: values.type,
          doctor: {
            id: medic.id,
            name: medic.firstName,
            lastname: medic.lastName
          },
          comment: values.comment ?? "",
          image: data.filePath
        }

        console.log(patientRecord)
        //TODO: UPLOAD TO DATABASE PLS
      } else {
        console.log('Médico no encontrado');
      }

    } else {
      console.error('Error en la subida del archivo');
    }
    //console.log(values);
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Tipo</SelectLabel>
                              <SelectItem {...field} value="examen">
                                Examen
                              </SelectItem>
                              <SelectItem {...field} value="consultation">
                                Consulta
                              </SelectItem>
                              <SelectItem {...field} value="analysis">
                                Analisis
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comentarios</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            onChange={(event) =>
                              onChange(
                                event.target.files && event.target.files[0],
                              )
                            }
                            type="file"
                            accept="image/*"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <br />
                <Button className="w-full" type="submit">
                  Añadir
                </Button>
              </form>
            </Form>

          </DialogContent>
        </Dialog>
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
