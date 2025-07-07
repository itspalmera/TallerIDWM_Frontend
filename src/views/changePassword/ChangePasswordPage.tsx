"use client";
import { UserServices } from "@/services/UserServices";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage,Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Validación con Zod
const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Contraseña actual requerida." }),
    newPassword: z
      .string()
      .min(6, { message: "Contraseña nueva muy corta." }),
    confirmNewPassword: z
      .string()
      .min(6, { message: "Debe confirmar la contraseña nueva." }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmNewPassword"],
  });

export const ChangePasswordPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [errorBool, setErrorBool] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    setErrorBool(false);

    await UserServices.changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmNewPassword,
    });

    setSuccessMessage("Contraseña cambiada exitosamente.");
    setShowSuccessAlert(true);
  } catch (error: any) {
    const errorCatch =
      error.response?.data?.message ?? error.message ?? "Error desconocido.";
    setErrors(errorCatch);
    setErrorBool(true);
    setSuccessMessage(null);
    setShowSuccessAlert(false);
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md p-6">
        <h1 className="text-center text-xl font-semibold mb-6">
          Cambiar Clave
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Contraseña actual */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nueva contraseña */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña nueva</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirmar nueva contraseña */}
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña nueva</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alerta de error */}
            {errorBool && (
              <Alert
                variant="default"
                className="border-red-500 bg-red-100 text-red-900"
              >
                <AlertTitle className="flex items-center gap-2">¡Error!</AlertTitle>
                <AlertDescription>{errors}</AlertDescription>
              </Alert>
            )}

            {/* Alerta de éxito */}
            {showSuccessAlert && (
              <Alert
                variant="default"
                className="border-green-500 bg-green-100 text-green-900"
              >
                <AlertTitle className="flex items-center gap-2">Éxito</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center pt-4">
              <Button type="submit" className="px-8">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};