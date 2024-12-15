"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  House,
  LogOut,
  User,
  UserRoundPlus,
  UserRoundSearch,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  dni: z
    .string()
    .min(8, { message: "El DNI debe tener como mínimo 8 dígitos" })
    .max(8, { message: "El DNI debe tener como máximo 8 dígitos" }),
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastname: z.string().min(1, { message: "El apellido es obligatorio" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  phone: z
    .string()
    .min(9, { message: "El número de celular debe tener al menos 9 dígitos" }),
  address: z.string().min(1, { message: "La dirección es obligatoria" }),
});

async function logoutHandle() {
  localStorage.removeItem("user");
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [dniButton, setdniButton] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: "",
      name: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setbuttonDisabled(true);
    console.log(values);
    router.refresh();
    setbuttonDisabled(false);
  }

  async function handleDni(): Promise<void> {
    setdniButton(true);
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

      form.setValue("name", dniResponse.nombres);
      form.setValue(
        "lastname",
        `${dniResponse.apellidoPaterno} ${dniResponse.apellidoMaterno}`
      );
    } catch (error) {
      console.error("Error fetching DNI:", error);
    }
    setdniButton(false);
  }

  return (
    <body>
      <nav className="inset-x-0 top-0 z-50 shadow-sm">
        <div className="w-full px-4 py-2">
          <div className="flex justify-between h-14 items-center">
            <div className="flex justify-start gap-5">
              <Link href="/">
                <Button size="icon" variant="outline">
                  <House />
                </Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <UserRoundPlus />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Añadir paciente</DialogTitle>
                    <DialogDescription>
                      Rellena los campos necesarios para añadir un nuevo
                      paciente
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="dni"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>DNI</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    placeholder="70123456"
                                    {...field}
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
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombres</FormLabel>
                              <FormControl>
                                <Input disabled {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Apellidos</FormLabel>
                              <FormControl>
                                <Input disabled {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="correo@mail.com"
                                  {...field}
                                />
                              </FormControl>
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
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dirección</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Calle Falsa 123"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <br />
                      <DialogFooter>
                        <Button
                          className="w-full"
                          type="submit"
                          disabled={buttonDisabled}
                        >
                          Añadir
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex justify-end gap-5">
              <Link href="/profile">
                <Button size="icon">
                  <User />
                </Button>
              </Link>
              <Button variant="outline" size="icon" onClick={logoutHandle}>
                <LogOut />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </body>
  );
}
