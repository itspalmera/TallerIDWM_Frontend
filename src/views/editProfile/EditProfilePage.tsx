"use client";

import { UserServices } from "@/services/UserServices";
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
import { useEffect, useState } from "react";
import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";




// Esquema Zod con validación completa
const formSchema = z
  .object({
    name: z.string().min(3, { 
      message: "El nombre debe tener al menos 3 caracteres." 
    }).optional(),

    lastname: z.string().min(3, { 
      message: "El apellido debe tener al menos 3 caracteres." 
    }).optional(),

    email: z.string().email({ 
      message: "Ingrese un correo válido." 
    }).optional(),

    phone: z.string().min(9, { 
      message: "El número debe tener al menos 9 dígitos." 
    }).optional(),

    birthDate: z.string().nonempty({ 
      message: "Fecha de nacimiento es requerida." 
    }).optional(),

    region: z.string().nonempty({ 
      message: "Región es requerida." 
    }).optional(),

    comuna: z.string().nonempty({ 
      message: "Comuna es requerida." 
    }).optional(),

    street: z.string().nonempty({ 
      message: "Calle es requerida." 
    }).optional(),

    number: z.string().nonempty({ 
      message: "Número es requerido." 
    }).optional(),

    postalCode: z.string().nonempty({ 
      message: "Código postal es requerido." 
    }).optional(),
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
  const onSubmitProfile = async (values: z.infer<typeof formSchema>) => {
    try {
      setErrorBool(false);
      const payload = Object.fromEntries(
        Object.entries({
          name: values.name,
          lastName: values.lastname,
          email: values.email,
          phone: values.phone,
          birthDate: values.birthDate,
        }).filter(([_, v]) => v && v.trim() !== "")
      );

      await UserServices.updateProfile(payload);
      setSuccessMessage("Perfil actualizado correctamente.");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrors(error.message || "Error desconocido");
      setErrorBool(true);
    }
  };

  const onSubmitAddress = async (values: z.infer<typeof formSchema>) => {
    try {
      setErrorBool(false);
      const payload = {
        street: values.street ?? "",
        number: values.number ?? "",
        commune: values.comuna ?? "",
        region: values.region ?? "",
        postalCode: values.postalCode ?? "",
      };

      await UserServices.updateAddress(payload);
      setSuccessMessage("Dirección actualizada correctamente.");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrors(error.message || "Error desconocido");
      setErrorBool(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl md:text-[24px] font-semibold text-center mb-8">Modificar cuenta</h1>

        <Form {...form}>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl><Input placeholder="Nombre" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="lastname" render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl><Input placeholder="Apellido" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl><Input placeholder="correo@blackcat.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl><Input placeholder="123456789" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="birthDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="region" render={({ field }) => (
              <FormItem>
                <FormLabel>Región</FormLabel>
                <FormControl><Input placeholder="Antofagasta" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="comuna" render={({ field }) => (
              <FormItem>
                <FormLabel>Comuna</FormLabel>
                <FormControl><Input placeholder="Comuna" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="street" render={({ field }) => (
              <FormItem>
                <FormLabel>Calle</FormLabel>
                <FormControl><Input placeholder="Calle 1" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="number" render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl><Input placeholder="123" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="postalCode" render={({ field }) => (
              <FormItem>
                <FormLabel>Código Postal</FormLabel>
                <FormControl><Input placeholder="1234567" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {errorBool && (
              <Alert variant="default" className="border-red-500 bg-red-100 text-red-900 md:col-span-2">
                <AlertTitle className="flex items-center gap-2">¡Error!</AlertTitle>
                <AlertDescription>{errors}</AlertDescription>
              </Alert>
            )}

            <div className="md:col-span-2 flex flex-col items-center mt-4 gap-4">
              <a href="/changePassword" className="text-sm text-[#0055FF] hover:text-blue-800 font-medium underline">
                Cambiar contraseña
              </a>
              <Button onClick={() => onSubmitProfile(form.getValues())} type="button" className="px-10">
                Guardar Perfil
              </Button>
              
              <Button onClick={() => onSubmitAddress(form.getValues())} type="button" className="px-10">
                Guardar Dirección
              </Button>

            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};