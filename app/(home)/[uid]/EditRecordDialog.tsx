"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const editFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    message: "El título es obligatorio",
  }),
  type: z.string({
    required_error: "Selecciona el tipo de historia",
  }),
  comment: z.string().optional(),
  patientId: z.string()
})

type EditRecordDialogProps = {
  buttondisabled: any
  onSubmit: any
  record: any
}

export const EditRecordDialog: React.FC<EditRecordDialogProps> = ({ buttondisabled, onSubmit, record }) => {

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title: "",
      type: "consultation",
      comment: "",
    }
  })

  useEffect(() => {
    if (record) {
      form.setValue("type", record.type);
      form.setValue("title", record.title);
      form.setValue("comment", record.comment);
      form.setValue("patientId", record.patientId);
      form.setValue("id", record.id)
    }
  }, [record.id, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar historia</DialogTitle>
          <DialogDescription>
            Rellena los campos necesarios para editar la historia actual
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={record.type}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo</SelectLabel>
                          <SelectItem {...field} value="exam">
                            Examen
                          </SelectItem>
                          <SelectItem {...field} value="consultation">
                            Consulta
                          </SelectItem>
                          <SelectItem {...field} value="analysis">
                            Analisis
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentarios</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <br />
            <Button className="w-full" type="submit" disabled={buttondisabled}>
              Actualizar
            </Button>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
