import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { PatientRecord } from "@/lib/models/PatientRecord"
import { Trash } from "lucide-react"

type DeleteRecordDialogProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDelete: any
  record: PatientRecord
}

export const DeleteRecordDialog: React.FC<DeleteRecordDialogProps> = ({ handleDelete, record }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" >
          <Trash /> Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Si haces esto no podras deshacerlo. Esto eliminará permanentemente este historial
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            handleDelete(record.id)
          }}>Sí, Eliminiar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
