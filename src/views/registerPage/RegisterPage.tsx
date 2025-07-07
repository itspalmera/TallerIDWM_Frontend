"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/hooks/useAuth";


// Definimos el esquema de validación con Zod
const formSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre debe tener al menos 3 caracteres.",
    }).nonempty({
        message: "Nombre es requerido.",
    }),

    lastName: z.string().min(3, {
        message: "El apellido debe tener al menos 3 caracteres.",
    }).nonempty({
        message: "Apellido es requerido.",
    }),

    email: z.string().email({
        message: "Ingrese un correo electrónico válido.",
    }).nonempty({
        message: "Email es requerido."
    }),

    phone: z.string().min(9, {
        message: "El número de teléfono debe tener al menos 9 caracteres.",
    }).nonempty({
        message: "Numero de teléfono es requerido.",
    }),

    birthdate: z.string().nonempty({
        message: "Fecha de nacimiento es requerida.",
    }),


    password: z.string().min(6, {
        message: "Contraseña debe tener al menos 6 caracteres.",
    }).nonempty({
        message: "Contraseña es requerida.",
    }),

    confirmPassword: z.string().min(6, {
        message: "Confirmar contraseña debe tener al menos 6 caracteres.",
    }).nonempty({
        message: "Confirmar contraseña es requerida.",
    }),
})

export const RegisterPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            phone: "",
            birthdate: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [errors, setErrors] = useState<string | null>(null);
    const [errorBool, setErrorBool] = useState<boolean>(false);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const { register } = useAuth();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setErrorBool(false);
        setErrors(null);
        console.log("Valores del formulario:", values);
        try {
            const success = await register(values);
            if (success) {
                setShowSuccessAlert(true);
            } else {
                setErrors("No se pudo registrar el usuario.");
                setErrorBool(true);
            }
        } catch (error: any) {
            console.log(error);
            setErrors(error);
            setErrorBool(true);
        }
    };


    return (
        <div className="min-h-screen bg-white">
            <div className="flex flex-col md:flex-row h-screen">

                {/* Lado Izquierdo */}
                <div className="md:w-1/2 w-full text-white flex flex-col justify-center items-center p-10"
                    style={{ background: "#8C34D0" }}>
                    <h1 className="text-3xl md:text-[40px] l font-bold mb-12 text-center">
                        Bienvenido a BlackCat
                    </h1>
                    <p className="text-2xl md:text-[30px] text-center">
                        Tu tienda favorita con los productos que necesitas al menor precio y mayor calidad
                    </p>
                    <p className="mt-10 text-xs md:text-sm text-gray-200 text-center">
                        © 2025 BlackCat. Todos los derechos reservados.
                    </p>
                </div>


                {/* Lado derecho */}

                <div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-white px-6 py-10">
                    <div className="w-full max-w-md">

                        {/* Titulo y subtitulo */}
                        <h1 className="text-2xl md:text-[30px] font-medium mb-2 text-center md:text-left">Crea tu cuenta</h1>

                        {showSuccessAlert && (
                            <Alert variant="default" className="border-green-500 bg-green-100 text-green-900">
                                <AlertTitle className="flex items-center gap-2">
                                    <svg
                                        className="h-5 w-5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    ¡Registro exitoso!
                                </AlertTitle>
                                <AlertDescription>
                                    {/* {successMessage} */}
                                </AlertDescription>
                            </Alert>

                        )}

                        {/* Redireccion a Login */}
                        <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
                            ¿Ya tienes cuenta?{' '}
                            <a href="login"
                                className="text-[#0055FF] hover:text-blue-800 font-semibold hover:underline">
                                Inicia sesión
                            </a>.
                        </p>

                        {/* Form de Registro */}
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
                                    name="lastName"
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


                                {/* TODO: PASSWORD */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg md:text-[20px]">Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* TODO: CONFIRM PASSWORD*/}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg md:text-[20px]">Confirmar Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirmar Contraseña" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* TODO: BIRTHDAY */}
                                <FormField
                                    control={form.control}
                                    name="birthdate"
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

                                {errorBool && (
                                    <Alert variant="default" className="border-red-500 bg-red-100 text-red-900 md:col-span-2">
                                        <AlertTitle className="flex items-center gap-2">
                                            <svg
                                                className="h-5 w-5 text-red-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-6h2v4h-2V7z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            ¡Error!
                                        </AlertTitle>
                                        <AlertDescription>{errors}</AlertDescription>
                                    </Alert>
                                )}

                                <Button type="submit" className="md:w-full mt-8 md:col-span-2 justify-self-center" >
                                    Registrarse
                                </Button>

                            </form>
                        </Form>

                    </div>
                </div>

            </div>
        </div>
    );
}
