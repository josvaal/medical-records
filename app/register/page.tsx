"use client"

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import validator from "validator"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { register } from "@/lib/authMethods";
import { UserRegister } from "@/lib/models/UserRegister";
import { UserRoundSearch } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Entrada email inválida"
  }),
  dni: z.string().min(8, {
    message: "El DNI debe tener como minimo 8 digitos",
  }).max(8, {
    message: "El DNI debe tener como maximo 8 digitos"
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener como mínimo 6 digitos"
  }),
  repeatPassword: z.string().min(6, {
    message: "La contraseña debe tener como mínimo 6 digitos"
  }),
  profession: z.string().max(30, {
    message: "La profesion debe tener como maximo 30 caracteres"
  }),
  firstName: z.string().max(40, {
    message: "El nombre debe tener como máximo 40 caracteres"
  }),
  lastName: z.string().max(40, {
    message: "El nombre debe tener como máximo 40 caracteres"
  }),
  phone: z.string().refine(validator.isMobilePhone),
  direction: z.string().max(30, {
    message: "La drección debe tener como maximo 30 caracteres"
  }),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Las contraseñas no coinciden",
  path: ["repeatPassword"],
})
export default function Register() {
  const [loading, setloading] = useState(true)
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const [dniButton, setdniButton] = useState(false)

  useEffect(() => {
    setloading(false);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      dni: "",
      password: "",
      repeatPassword: "",
      profession: "",
      firstName: "",
      lastName: "",
      phone: "",
      direction: ""
    },
  })

  async function handleDni(): Promise<void> {
    setdniButton(true)
    const dni = form.getValues("dni");
    if (!dni) return;

    try {
      const response = await fetch(`/api/fetchDni?dni=${dni}`);

      if (!response.ok) {
        console.error(`Error fetching DNI: ${response.statusText}`);
        return;
      }

      const dniResponse = await response.json();

      if (dniResponse.message === "dni invalido") return;

      form.setValue("firstName", dniResponse.nombres);
      form.setValue(
        "lastName",
        `${dniResponse.apellidoPaterno} ${dniResponse.apellidoMaterno}`
      );
    } catch (error) {
      console.error("Error fetching DNI:", error);
    }
    setdniButton(false)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setbuttonDisabled(true)

    const user: UserRegister = {
      email: values.email,
      dni: values.dni,
      password: values.password,
      repeatPassword: values.repeatPassword,
      profession: values.profession,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      direction: values.direction
    }
    await register(user)

    setbuttonDisabled(false)
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {loading ? (
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Cargando...
        </h1>
      ) : (
        <Card className="min-w-[350px]">
          <CardHeader>
            <CardTitle>Registrarme</CardTitle>
            <CardDescription>Ingresa tus credenciales para iniciar sesión</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-3 gap-10">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tucorreo@mail.com" {...field} required />
                        </FormControl>
                        <FormDescription>Tu correo electrónico personal</FormDescription>
                        <FormMessage />
                      </FormItem>

                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="" {...field} required />
                        </FormControl>
                        <FormDescription>Contraseña de la cuenta</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repetir contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="" {...field} required />
                        </FormControl>
                        <FormDescription>Confirmar contraseña de la cuenta</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="dni"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>DNI</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="70123456" {...field} required />
                          </FormControl>
                          <FormDescription>Documento Nacional de Identidad</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleDni}
                      disabled={dniButton}
                    >
                      <UserRoundSearch />
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} disabled required />
                        </FormControl>
                        <FormDescription>Nombres en base al DNI</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} disabled required />
                        </FormControl>
                        <FormDescription>Apellidos en base al DNI</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profesión</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} required />
                        </FormControl>
                        <FormDescription>Ingresa tu especialidad</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nro. Celular</FormLabel>
                        <FormControl>
                          <Input placeholder="901234567" {...field} required />
                        </FormControl>
                        <FormDescription>Tu Nro. Celular personal</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="direction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder="Calle Falsa 123" {...field} required />
                        </FormControl>
                        <FormDescription>La dirección en donde vives</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <br />
                <Button className="w-full" type="submit" disabled={buttonDisabled}>Registrarme</Button>
                <Link href="/login" className="w-full flex mt-2 text-sm justify-center">
                  ¿Ya tienes una cuenta? Iniciar Sesión
                </Link>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

