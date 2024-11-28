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
})

export default function Register() {
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
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
                        <Input type="email" placeholder="tucorreo@mail.com" {...field} />
                      </FormControl>
                      <FormDescription>Tu correo electrónico personal</FormDescription>
                      <FormMessage />
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70123456" {...field} />
                      </FormControl>
                      <FormDescription>Documento Nacional de Identidad</FormDescription>
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
                        <Input type="password" placeholder="" {...field} />
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
                        <Input type="password" placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>Confirmar contraseña de la cuenta</FormDescription>
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
                        <Input placeholder="" {...field} />
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
                        <Input placeholder="901234567" {...field} />
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
                        <Input placeholder="Calle Falsa 123" {...field} />
                      </FormControl>
                      <FormDescription>La dirección en donde vives</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <br />
              <Button className="w-full" type="submit">Registrarme</Button>
              <Link href="/login" className="w-full flex mt-2 text-sm justify-center">
                ¿Ya tienes una cuenta? Iniciar Sesión
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

