"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Esquema Zod con validación completa
const formSchema = z
  .object({
    name: z.string().min(3, { 
      message: "El nombre debe tener al menos 3 caracteres." 
    }),

    lastname: z.string().min(3, { 
      message: "El apellido debe tener al menos 3 caracteres." 
    }),

    email: z.string().email({ 
      message: "Ingrese un correo válido." 
    }),

    phone: z.string().min(9, { 
      message: "El número debe tener al menos 9 dígitos." 
    }),

    birthDate: z.string().nonempty({ 
      message: "Fecha de nacimiento es requerida." 
    }),

    region: z.string().nonempty({ 
      message: "Región es requerida." 
    }),

    comuna: z.string().nonempty({ 
      message: "Comuna es requerida." 
    }),

    street: z.string().nonempty({ 
      message: "Calle es requerida." 
    }),

    number: z.string().nonempty({ 
      message: "Número es requerido." 
    }),

    postalCode: z.string().nonempty({ 
      message: "Código postal es requerido." 
    }),
  })

export const EditProfilePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      birthDate: "",
      region: "",
      comuna: "",
      street: "",
      number: "",
      postalCode: "",
    },
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [errorBool, setErrorBool] = useState<boolean>(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //!VER QUE HACER CON ESTO
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setErrorBool(false);
      const data = await ApiBackend.post<ResponseAPI>("Auth/register", values);
      if (data.data?.success) {
        setSuccessMessage(data.data.message ?? "Registro exitoso.");
        setShowSuccessAlert(true);
      }
    } catch (error: any) {
      const errorCatch = error.response?.data?.message ?? "Error desconocido.";
      setErrors(errorCatch);
      setErrorBool(true);
      setSuccessMessage(null);
      setShowSuccessAlert(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl md:text-[24px] font-semibold text-center mb-8">Modificar cuenta</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/*TODO: USERNAME */}
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Nombre</FormLabel>
                        <FormControl>
                            <Input placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* TODO: lastName */}
            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Apellido</FormLabel>
                        <FormControl>
                            <Input placeholder="Apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* TODO: EMAIL */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Correo</FormLabel>
                        <FormControl>
                            <Input placeholder="correo@blackcat.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* TODO: PHONE NUMBER */}
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Celular</FormLabel>
                        <FormControl>
                            <Input placeholder="123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* TODO: BIRTHDAY */}
            <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Fecha de Nacimiento</FormLabel>
                        <FormControl>
                            <Input placeholder="YYYY-MM-DD" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Region</FormLabel>
                          <FormControl>
                            <Input placeholder="Antofagasta" {...field} />
                          </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="comuna"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Comuna</FormLabel>
                        <FormControl>
                            <Input placeholder="123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Calle</FormLabel>
                          <FormControl>
                            <Input placeholder="calle 1" {...field} />
                          </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Numero</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg md:text-[20px]">Codigo postal</FormLabel>
                        <FormControl>
                            <Input placeholder="123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {errorBool && (
              <Alert variant="default" className="border-red-500 bg-red-100 text-red-900 md:col-span-2">
                <AlertTitle className="flex items-center gap-2">¡Error!</AlertTitle>
                <AlertDescription>{errors}</AlertDescription>
              </Alert>
            )}

            {/* Botón centrado */}
            <div className="md:col-span-2 flex flex-col items-center mt-4">
              <a
                href="/changePassword"
                className="text-sm text-[#0055FF] hover:text-blue-800 font-medium underline mb-4"
              >
                Cambiar contraseña
              </a>
              <Button type="submit" className="px-10">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
