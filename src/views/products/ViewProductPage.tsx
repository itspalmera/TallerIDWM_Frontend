'use client';

import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/Products/ProductCard";
import { ProductDialog } from "@/components/Products/ProductDialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/interfaces/Products/Product";
import { useProductStore } from "@/stores/ProductStore"
import { SelectItemText } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

export default function ViewProductPage() {
    const { products, loading, filters, fetchProducts } = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold bg-purple-300">Cargando productos...</div>;
    }

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar />
            {/* Filters bar */}
            <div className="p-8 mx-auto"
                style={{ background: "#F1D0FF" }}>
                <div className="flex flex-wrap gap-12 justify-center items-center">
                    {/* Filtro Categoría */}
                    <div className="flex flex-col items-start w-[252px] min-w-[232px] min-h-[38px]">
                        <span className="text-[20px] font-bold mb-1">Categoría</span>
                        <Select>
                            <SelectTrigger className="w-full bg-white border border-purple-300 hover:border-purple-400 focus:border-purple-500">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="categoria1">Categoría 1</SelectItem>
                                    <SelectItem value="categoria2">Categoría 2</SelectItem>
                                    <SelectItem value="categoria3">Categoría 3</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Filtro Marca */}
                    <div className="flex flex-col items-start w-[229px] min-w-[209px] min-h-[38px]">
                        <span className="text-[20px] font-bold mb-1">Marca</span>
                        <Select>
                            <SelectTrigger className="w-full bg-white border border-purple-300 hover:border-purple-400 focus:border-purple-500">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="marca1">Marca 1</SelectItem>
                                    <SelectItem value="marca2">Marca 2</SelectItem>
                                    <SelectItem value="marca3">Marca 3</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Filtro Rango de Precios */}
                    <div className="flex flex-col items-start  w-[266px] min-w-[246px] min-h-[38px]">
                        <span className="text-[20px] font-bold mb-1">Rango de Precios</span>
                        <Select>
                            <SelectTrigger className="w-full bg-white border border-purple-300 hover:border-purple-400 focus:border-purple-500">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="rango1">$0 - $20.000</SelectItem>
                                    <SelectItem value="rango2">$20.001 - $50.000</SelectItem>
                                    <SelectItem value="rango3">$50.001 - $150.000</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Filtro Estado */}
                    <div className="flex flex-col items-start w-[215px] min-w-[195px] min-h-[38px]">
                        <span className="text-[20px] font-bold mb-1">Estado</span>
                        <Select>
                            <SelectTrigger className="w-full bg-white border border-purple-300 hover:border-purple-400 focus:border-purple-500">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="nuevo">Nuevo</SelectItem>
                                    <SelectItem value="usado">Usado</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Filtro Ordenar por Precio */}
                    <div className="flex flex-col items-start  w-[200px] min-w-[180px] min-h-[38px]">
                        <span className="text-[20px] font-bold mb-1">Ordenar por Precio</span>
                        <Select>
                            <SelectTrigger className="w-full bg-white border border-purple-300 hover:border-purple-400 focus:border-purple-500">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="asc">Menor a Mayor</SelectItem>
                                    <SelectItem value="desc">Mayor a Menor</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Filtro Ordenar por Nombre */}
                    <div className="flex flex-col items-start w-[200px] min-w-[180px] min-h-[38px]">
                        <span className="text-[20px] font-bold mb-1">Ordenar por Nombre</span>
                        <Select>
                            <SelectTrigger className="w-full bg-white border border-purple-300 hover:border-purple-400 focus:border-purple-500">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="asc">A - Z</SelectItem>
                                    <SelectItem value="desc">Z - A</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
            </div>
            {/* Products Section */}
            <div className="max-w-7xl mx-auto p-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard
                        key={product.title}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                    />
                ))}
            </div>

            {/* ProductDialog con Producto Seleccionado */}
            <ProductDialog
                product={selectedProduct}
                open={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
            {/* Pagination */}
            <div className="flex flex-col justify-center m-12">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="px-16 text-[18px]" href="#"> Página 1 </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}