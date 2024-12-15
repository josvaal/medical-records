import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type EditPatientFormProps = {
  onSubmit: any
  patient: any
  buttonDisabled: boolean
}

const formSchema = z.object({
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  phone: z
    .string()
    .min(9, { message: "El número de celular debe tener al menos 9 dígitos" }),
  address: z.string().min(5, { message: "La dirección debe tener más de 5 caracteres" }),
  id: z.string()
})

type FormData = z.infer<typeof formSchema>

export const EditPatientForm: React.FC<EditPatientFormProps> = ({ onSubmit, patient, buttonDisabled }) => {

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      address: "",
    },
  })

  useEffect(() => {
    form.setValue("email", patient.email)
    form.setValue("phone", patient.phone)
    form.setValue("address", patient.address)
    form.setValue("id", patient.id)
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nro. Celular</FormLabel>
              <FormControl>
                <Input{...field} />
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
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <Button className="w-full" type="submit" disabled={buttonDisabled}>Modificar</Button>
      </form>
    </Form>
  )
}
