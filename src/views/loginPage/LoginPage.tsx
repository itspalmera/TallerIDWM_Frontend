"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

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

export const LoginPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [errors] = useState<string | null>(null);
    const [errorBool] = useState<boolean>(false);


    const { login } = useAuth();
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const user = await login(values);
        if (user) {
            if (user.role === "Admin") router.push("/admin/userList");
            else if (user.role === "User") router.push("/client/changePassword");
        }
    };

    return (
        <div className="min-h-screen bg-white">
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