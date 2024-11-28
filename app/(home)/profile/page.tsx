"use client"
import * as z from "zod"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"
import { Edit, Mail, MapPin, Phone, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Por favor ingresa un numero telefonico válido"
  }),
  email: z.string().email({ message: "Por favor ingresa un correo válido" }),
  address: z.string().min(5, { message: "La dirección debe tener más de 5 caracteres" }),
})

type FormData = z.infer<typeof formSchema>

export default function Profile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [medicData, setMedicData] = useState({
    phoneNumber: "+51906706357",
    email: "jane.smith@example.com",
    address: "123 Medical Center, Health City, MC 12345",
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: medicData.phoneNumber,
      email: medicData.email,
      address: medicData.address,
    },
  })

  function onSubmit(values: FormData) {
    setMedicData({ ...medicData, ...values })
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your contact information has been successfully updated.",
    })
  }

  return (
    <div className="flex w-full mt-10 justify-center items-center">
      <Card className="w-[30rem]">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <div>
              <CardTitle>Nombre Apellido</CardTitle>
              <p className="text-sm text-muted-foreground">Cardiologo</p>
            </div>
            <div>
              <Button size="icon" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Save /> : <Edit />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nro. Celular</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Direccion</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br />
                <Button type="submit" className="w-full">Guardar cambios</Button>
              </form>
            </Form>
          ) : (
            <div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 opacity-70" />
                <span>906706357</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 opacity-70" />
                <span>josval.personal@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 opacity-70" />
                <span>Jirón 28 de Julio #330</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

