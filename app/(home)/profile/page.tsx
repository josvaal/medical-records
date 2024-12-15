"use client"
import * as z from "zod"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Mail, MapPin, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { UserMetadata } from "@/lib/models/UserMetadata";
import { getMedic, updateMedic } from "@/lib/medicMethods";
import { useStore } from "@/lib/utils";
import { EditProfileForm } from "./EditProfileForm";

const formSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Por favor ingresa un numero telefonico válido"
  }),
  direction: z.string().min(5, { message: "La dirección debe tener más de 5 caracteres" }),
})

type FormData = z.infer<typeof formSchema>

export default function Profile() {
  const { setIsLoading, isLoading } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [medicData, setMedicData] = useState<UserMetadata | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      direction: "",
    },
  })

  async function onSubmit(values: FormData) {
    setMedicData({ ...medicData!!, ...values })

    //console.log(medicData);
    await updateMedic(values)

    setIsEditing(false)
    fetchMedic()
  }

  async function fetchMedic() {
    try {
      const medic: UserMetadata | null = await getMedic();
      if (medic) {
        setMedicData(medic);
        form.setValue("phone", medic?.phone ?? "")
        form.setValue("direction", medic?.direction ?? "")
        console.log(medic)
      } else {
        console.log("Medic not found");
      }
    } catch (error) {
      console.error("Error fetching medic:", error);
    }
    console.log(isLoading);
  }

  useEffect(() => {
    fetchMedic();
  }, [])

  return (
    <div className="flex w-full mt-10 justify-center items-center">
      <Card className="w-[30rem]">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <div>
              <CardTitle>{medicData?.firstName} {medicData?.lastName}</CardTitle>
              <p className="text-sm text-muted-foreground">{medicData?.profession}</p>
            </div>
            <div>
              <Button size="icon" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <X /> : <Edit />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <EditProfileForm form={form} onSubmit={onSubmit} />
          ) : (
            <div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 opacity-70" />
                <span>{medicData?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 opacity-70" />
                <span>{medicData?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 opacity-70" />
                <span>{medicData?.direction}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

