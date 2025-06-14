"use client";

import { ApiBackend } from "@/clients/axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { set } from "zod/v4-mini";

const formSchema = z.object({
    email: z.string().email({
        message: "Ingrese un correo electrónico válido.",
    }).nonempty({
        message: "Email es requerido.",
    }),
    password: z.string().nonempty({
        message: "Contraseña es requerida.",
    }),
})

// Mantiene la lógica de negocio de la página de inicio de sesión (Axios)
export const LoginPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const[errors, setErrors] = useState<string | null>(null);
    const[errorBool, setErrorBool] = useState<boolean>(false);
    const { auth } = useContext(AuthContext);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log("Valores enviados en formulario:", values);
            const { data } = await ApiBackend.post<ResponseAPI>('auth/login', values);

            if (data.success === false) {
                console.error("Error en la respuesta del servidor:", data.message);
                setErrors("Error en la respuesta del servidor: ");
                setErrorBool(true);
                return;
            }
            setErrors(null);
            setErrorBool(false);

            const data_ = data.data;
            const user_ : User = {
                email : data_.email,
                lastName : data_.lastName,
                name : data_.name,
                token : data_.token,
            } 

            console.log("Datos del usuario:", user_);
            auth(user_);
        }
        catch (error : any) {
            let errorCatch = error.response.data.message
            console.error("Error al enviar el formulario:", errorCatch);
            setErrors(errorCatch);
            setErrorBool(true);
        }
    
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Lado Izquierdo */}
            <div className="md:w-1/2 w-full bg-purple-600 text-white flex flex-col justify-center items-center p-10">
                <h1 className="text-3xl md:text-[40px] l font-bold mb-12 text-center">
                    Bienvenido a BlackCat
                </h1>
                <p className="text-2xl md:text-[30px] text-center">
                    Tu tienda favorita con los productos que necesitas al menor precio y mayor calidad
                </p>
            </div>

            {/* Lado Derecho */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-white py-10">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl md:text-[40px] font-bold mb-4 text-center">
                        BlackCat
                    </h2>
                    <h3 className="text-2xl md:text-[30px] font-semibold mb-4 text-center">
                        Iniciar Sesión
                    </h3>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {errorBool && (
                                <div className="text-red-500 text-sm text-center p-2 bg-red-100 rounded">
                                    {errors}
                                </div>
                            )}

                            <Button type="submit" className="md:w-full flex items-center justify-center">Iniciar Sesión</Button>
                        </form>
                    </Form>

                    <div className="m-4 text-sm text-gray-600 text-center md:text-center">
                        ¿No tienes cuenta? {' '}
                        <a href="#" className=" text-blue-600 hover:text-blue-800 font-semibold">
                            Regístrate
                        </a>
                    </div>

                </div>
            </div>

        </div>
    )
}