import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Patient } from "@/lib/models/Patients"
import { Eye, IdCard, Mail, MapPinned, Phone, User } from "lucide-react"

type PatientDialogProps = {
  patient: Patient
}

export const PatientDialog: React.FC<PatientDialogProps> = ({ patient }) => {
  return (
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
          <span>{patient.dni}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 opacity-70" />
          <span>{patient.name} {patient.lastname}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 opacity-70" />
          <span>{patient.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 opacity-70" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPinned className="w-4 h-4 opacity-70" />
          <span>{patient.address}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
