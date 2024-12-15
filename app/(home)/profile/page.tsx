"use client";
import * as z from "zod";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Mail, MapPin, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditProfileForm } from "./EditProfileForm";

const formSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Por favor ingresa un numero telefonico válido",
  }),
  direction: z
    .string()
    .min(5, { message: "La dirección debe tener más de 5 caracteres" }),
});

type FormData = z.infer<typeof formSchema>;

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "+51 999 999 999",
      direction: "Calle Falsa 123",
    },
  });

  async function onSubmit(values: FormData) {
    console.log(values)
    setIsEditing(false);
  }

  return (
    <div className="flex w-full mt-10 justify-center items-center">
      <Card className="w-[30rem]">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <div>
              <CardTitle>
                USUARIO DEMO
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Tester
              </p>
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
                <span>+51 999 999 999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 opacity-70" />
                <span>demo@email.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 opacity-70" />
                <span>Calle Falsa 123</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
