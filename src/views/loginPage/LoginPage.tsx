"use client";

import { ApiBackend } from "@/clients/axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/helpers/decodeJWT";

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

    const [errors, setErrors] = useState<string | null>(null);
    const [errorBool, setErrorBool] = useState<boolean>(false);

    const { auth } = useContext(AuthContext);

    const router = useRouter();

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
            const payload = decodeJWT(data_.token);
            if (!payload) {
                console.error("Error al decodificar el token JWT");
                setErrors("Error al decodificar el token JWT");
                setErrorBool(true);
                return;
            }

            const user_: User = {
                email: data_.email,
                lastName: data_.lastName,
                name: data_.name,
                token: data_.token,
                role: payload.role,
            }

            // Guardar el token en localStorage
            localStorage.setItem('token', data_.token);

            console.log("Datos del usuario:", user_);
            auth(user_);
            if (payload.role === 'Admin') {
                // Redirigir al dashboard de administrador
                router.push('/admin')
            } else if (payload.role === 'User') {
                // Redirigir al dashboard de usuario
                router.push('/client')
            }
        }
        catch (error: any) {
            let errorCatch =
                error?.response?.data?.message ||
                error?.message ||
                "Error desconocido al enviar el formulario";
            console.error("Error al enviar el formulario:", errorCatch);
            setErrors(errorCatch);
            setErrorBool(true);
        }

    }

    return (
        <div className="min-h-screen bg-white">
            {/* NavbarBase fuera del flex de los lados */}
            <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
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

                {/* Lado Derecho */}
                <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">
                    <div className="w-full max-w-md">
                        {/* Título y Subtítulo */}
                        <h1 className="text-2xl md:text-[30px] font-medium mb-2 text-center md:text-left">
                            Iniciar Sesión
                        </h1>

                        <div className="mt-2 mb-8  text-sm text-gray-600 text-center md:text-left">
                            ¿No tienes cuenta? {' '}
                            <a href="register"
                                className="text-[#0055FF] hover:text-blue-800 font-semibold hover:underline">
                                Regístrate
                            </a>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg md:text-[20px]">Correo Electrónico</FormLabel>
                                            <FormControl>
                                                <Input placeholder="correo@blackcat.com" {...field} />
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
                                            <FormLabel className="text-lg md:text-[20px]">Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="" {...field} />
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


                                <Button type="submit" className="md:w-full flex items-center justify-center">Iniciar Sesión</Button>
                            </form>
                        </Form>

                    </div>
                </div>

            </div>
        </div>
    );
}