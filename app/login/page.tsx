"use client"

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

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
  dni: z.string().min(8, {
    message: "El DNI debe tener como minimo 8 digitos",
  }).max(8, {
    message: "El DNI debe tener como maximo 8 digitos"
  }),
  password: z.string().min(6, {
    message: "La contraseña contiene 6 digitos como mínimo"
  })
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: "",
      password: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para iniciar sesión</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <br />
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
              <br />
              <Button className="w-full" type="submit">Iniciar Sesión</Button>
              <Link href="/register" className="w-full flex mt-2 text-sm justify-center">
                ¿Aun no tienes una cuenta? Registrarme
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

