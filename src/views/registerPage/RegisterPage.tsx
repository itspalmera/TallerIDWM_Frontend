"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { use } from "react";
import { number, any, email } from 'zod/v4-mini';
import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { fi } from "zod/v4/locales";


// Definimos el esquema de validación con Zod
const formSchema = z.object({
    name: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }).nonempty({
        message: "Username is required.",
    }),

    lastname: z.string().min(3, {
        message: "Last name must be at least 3 characters.",
    }).nonempty({
        message: "Last name is required.",
    }),
    
    email: z.string().email( {
        message: "Please enter a valid email address.",
    }).nonempty({
        message: "Email is required."
    }),

    phone: z.string().min(9, {
        message: "Phone number must be at least 10 characters.",
    }).nonempty({
        message: "Phone number is required.",
    }),

    birthDate: z.string().nonempty({ 
        message: "Birthday is required." }),


    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).nonempty({
        message: "password required.",
    }),

    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).nonempty({
        message: "password required.",
    }),
})

export const RegisterPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
            phone: "",
            birthDate: "",
            password: "",
            confirmPassword: "",

        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log("Valores enviados en el formulario:", values);
            const data = await ApiBackend.post<ResponseAPI>('Auth/register', values);
            /*
            const user_ : User = {
                firstName: data.firtsName,
                email: data.email,
                lastName: data.lastName,
                token : data.token
            }
            */
            console.log("Respuesta del servidor:", data);

        }
        
        catch (error: any) {
            console.error("Error al enviar el formulario:", error);
        }
    }


    return (
        // Usaremos Axios y cosas aqui 
        <div className="flex flex-col md:flex-row h-screen">

            {/* Lado izquierdo*/}
            <div className="md:w-1/2 w-full bg-purple-700 text-white flex flex-col justify-center items-center p-10">
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Bienvenido a <br className="hidden md:block"/> BlackCat
                </h1>

                <p className="text-base md:text-lg text-justify max-w-md">
                    Tu tienda favorita con los productos que necesitas al menor precio y mayor calidad.
                </p>

                <p className="mt-10 text-xs md:text-sm text-gray-200 text-center">
                    © 2025 BlackCat. Todos los derechos reservados.
                </p>
            </div>


            {/* Lado derecho */}

            <div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-white px-6 py-10">
                <div className="w-full max-w-md">

                    {/* Titulo y subtitulo */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">BlackCat</h2>
                    <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left">Crea tu cuenta</h3>

                    {/* Redireccion a Login */}
                    <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
                        ¿Ya tienes cuenta?{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Inicia sesión
                        </a>.
                    </p>
                    
                    {/* Form de Registro */}
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                        
                        {/*TODO: USERNAME */}
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="nombre" {...field} />
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
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input placeholder="apellido" {...field} />
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
                            <FormLabel>Correo</FormLabel>
                            <FormControl>
                                <Input placeholder="correo" {...field} />
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
                            <FormLabel>Numero</FormLabel>
                            <FormControl>
                                <Input placeholder="numero" {...field} />
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
                            <FormLabel>Fecha de Nacimiento</FormLabel>
                            <FormControl>
                                <Input placeholder="YYYY-MM-DD" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        {/* TODO: PASSWORD */}
                        <FormField
                            control={form.control}
                            name="password"
                            render = {({ field }) => (
                                <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="contraseña" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                                )}
                        />

                        {/* TODO: CONFIRM PASSWORD*/}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render = {({ field }) => (
                                <FormItem>
                                <FormLabel>Confirmar Contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="confirmar contraseña" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                                )}
                        />

                        <Button type="submit">registrar</Button>
                    </form>
                    </Form>

                </div>
            </div>

        </div>
    ); 
}
