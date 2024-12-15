import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { AddRecordFormData } from "./page";

type AddRecordDialogProps = {
  buttondisabled: boolean;
  form: UseFormReturn<AddRecordFormData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
};

export const AddRecordDialog: React.FC<AddRecordDialogProps> = ({
  buttondisabled,
  form,
  onSubmit,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Añadir Historia</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir historia</DialogTitle>
          <DialogDescription>
            Rellena los campos necesarios para añadir una nueva historia médica
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
              <FormField
                control={form.control}
                name="image"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Imágen</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                        type="file"
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <br />
            <Button className="w-full" type="submit" disabled={buttondisabled}>
              Añadir
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
