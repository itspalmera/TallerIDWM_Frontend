'use client';

import { ProductCard } from "@/components/Products/ProductCard";
import { Product } from "@/interfaces/Products/Product";
import { useProductStore } from "@/stores/ProductStore"
import { useEffect, useState } from "react";

export default function ViewProductPage() {
    const { products, loading, filters, fetchProducts} = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState<Product|null>(null); 

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold">Cargando productos...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            
            {/* Products Section */}
            <div className="max-w-7xl mx-auto p-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard 
                        key={product.title}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                    />
                ))}
            </div>
            
        </div>
    )
}