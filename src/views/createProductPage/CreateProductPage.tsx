'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useProductStore } from "@/stores/ProductStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(1, "El título es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0"),
    stock: z.coerce.number().min(0, "El stock debe ser mayor o igual a 0"),
    category: z.string().min(1, "La categoría es obligatoria"),
    brand: z.string().min(1, "La marca es obligatoria"),
    images: z
        .instanceof(File, { message: "Debes subir una imagen" })
        .refine((file) => file && file.size > 0, "Debes subir una imagen"),
    condition: z.string().min(1, "Indique el estado del producto"),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateProductPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            alert("Acceso denegado. Solo administradores pueden acceder.");
            router.push("/");
        }
    }, [user]);

    const { addProduct } = useProductStore();
    const [errors, setErrors] = useState("");
    const [errorBool, setErrorBool] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            stock: 0,
            category: "",
            brand: "",
            images: undefined,
            condition: "",
        }
    });

    const onSubmit = async (values: FormValues) => {
        try {
            setErrorBool(false);
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("price", values.price.toString());
            formData.append("stock", values.stock.toString());
            formData.append("category", values.category);
            formData.append("brand", values.brand);
            formData.append("condition", values.condition);
            formData.append("images", values.images);

            await addProduct(formData); 
            alert("Producto creado exitosamente");
            router.push("/admin");
            form.reset();
        } catch (error: any) {
            setErrors(error.message);
            setErrorBool(true);
        }
    };

    return (
        <div className="container max-w-2xl py-10 px-4 md:px-8 bg-white shadow rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Nuevo Producto</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl><Input placeholder="Ej: Polera BlackCat" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl><Textarea placeholder="Descripción detallada del producto..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>
                            <FormControl><Input type="number" min={0} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="stock" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl><Input type="number" min={0} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoría</FormLabel>
                            <FormControl><Input placeholder="Ej: Ropa" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="brand" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Marca</FormLabel>
                            <FormControl><Input placeholder="Ej: BlackCat" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagen del producto</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            field.onChange(e.target.files?.[0]);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="condition" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado del producto</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona estado" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="nuevo">Nuevo</SelectItem>
                                    <SelectItem value="usado">Usado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {errorBool && (
                        <Alert variant="default" className="border-red-500 bg-red-100 text-red-900">
                            <AlertTitle className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-6h2v4h-2V7z" clipRule="evenodd" />
                                </svg>
                                ¡Error!
                            </AlertTitle>
                            <AlertDescription>{errors}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Crear Producto
                    </Button>
                </form>
            </Form>
        </div>
    );
};