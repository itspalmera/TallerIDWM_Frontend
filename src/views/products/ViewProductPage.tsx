'use client';

import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/Products/ProductCard";
import { ProductDialog } from "@/components/Products/ProductDialog";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Product } from "@/interfaces/Products/Product";
import { useProductStore } from "@/stores/ProductStore"
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
                {/* Aquí puedes agregar tus filtros */}
                {/* 6 Combobox para filtrar productos */}


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