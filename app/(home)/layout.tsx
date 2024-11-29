"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { House, LogOut, User, UserRoundPlus, UserRoundSearch } from "lucide-react";
import Link from "next/link";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                      Rellena los campos necesarios para añadir un nuevo paciente
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dni" className="text-right">
                        DNI
                      </Label>
                      <Input
                        id="dni"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nombres
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="lastname" className="text-right">
                        Apellidos
                      </Label>
                      <Input
                        id="lastname"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Correo
                      </Label>
                      <Input
                        id="emai"
                        type="email"
                        defaultValue="nombre@correo.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Nro. Celular
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+51912345678"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Dirección
                      </Label>
                      <Input
                        id="address"
                        defaultValue="Calle Falsa 123"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className="w-full" type="submit">Añadir</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="flex gap-1">
                <Input placeholder="Buscar por DNI" />
                <Button variant="outline" size="icon">
                  <UserRoundSearch />
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-5">
              <Link href="/profile">
                <Button size="icon">
                  <User />
                </Button>
              </Link>
              <Button variant="outline" size="icon">
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
