"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Valores enviados de formulario:", values);
        // Aquí puedes manejar la lógica de inicio de sesión, como enviar los datos a un servidor
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