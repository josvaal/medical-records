import Link from "next/link";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, IdCard, Mail, MapPinned, Pencil, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const patients = [
  {
    uid: "1",
    dni: "76133536",
    name: "José Valentino",
    lastname: "Masías Castillo"
  }, {
    uid: "2",
    dni: "76133536",
    name: "José Valentino",
    lastname: "Masías Castillo"
  }, {
    uid: "3",
    dni: "76133536",
    name: "José Valentino",
    lastname: "Masías Castillo"
  }, {
    uid: "4",
    dni: "76133536",
    name: "José Valentino",
    lastname: "Masías Castillo"
  }, {
    uid: "5",
    dni: "76133536",
    name: "José Valentino",
    lastname: "Masías Castillo"
  },
]

export default function Home() {
  // TODO: FIX THIS PLEASE, OR SHITTED THE PROJECT
  const [patients, setpatients] = useState([])

  return (
    <div className="flex flex-col h-[calc(100vh-10vh)]">
      <div className='grid grid-cols-1 md:grid-cols-2 p-3 gap-3'>
        {patients.map((patient, index) => (
          <Card key={index} className='flex justify-between items-center'>
            <CardHeader>
              <CardTitle>
                <Link href={`/${patient.uid}`}>
                  {patient.name} {patient.lastname}
                </Link>
              </CardTitle>
              <CardDescription>{patient.dni}</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-end items-center gap-3'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <Eye />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{patient.name} {patient.lastname}</DialogTitle>
                    <DialogDescription>
                      Información acerca de este paciente
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <IdCard className="w-4 h-4 opacity-70" />
                    <span>76133536</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 opacity-70" />
                    <span>José Valentino Masías Castillo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 opacity-70" />
                    <span>josval.personal@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 opacity-70" />
                    <span>+51906706357</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinned className="w-4 h-4 opacity-70" />
                    <span>Jirón 28 de Julio 330</span>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{patient.name} {patient.lastname}</DialogTitle>
                    <DialogDescription>
                      Rellena los campos
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="mail" className="text-right">
                        Correo
                      </Label>
                      <Input
                        id="mail"
                        defaultValue="josval.personal@gmail.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Nro. Celular
                      </Label>
                      <Input
                        id="phone"
                        defaultValue="+51906706357"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="direction" className="text-right">
                        Dirección
                      </Label>
                      <Input
                        id="direction"
                        defaultValue="Jirón 28 de Julio 330"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className="w-full" type="submit">Modificar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex-1">
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#?start=0?end=10" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#?start=10?end=20">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#?start=20?end=30">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

