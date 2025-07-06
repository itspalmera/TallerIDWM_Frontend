'use client';

import { ProductCard } from "@/components/Products/ProductCard";
import { ProductDialog } from "@/components/Products/ProductDialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/interfaces/Products/Product";
import { ProductServices } from "@/services/ProductServices";
import { useProductStore } from "@/stores/ProductStore"
import { useEffect, useState } from "react";

export default function ViewProductPage() {
    const { products, loading, filters, fetchProducts, setFilters, metadata } = useProductStore();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [localMinPrice, setLocalMinPrice] = useState<string>("");
    const [localMaxPrice, setLocalMaxPrice] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { products: all } = await ProductServices.fetchProducts({});
                setAllProducts(all);
                const cats = Array.from(new Set(all.map(p => p.category))).filter((cat): cat is string => typeof cat === "string");
                const brds = Array.from(new Set(all.map(p => p.brand))).filter((brd): brd is string => typeof brd === "string");
                setCategories(cats);
                setBrands(brds);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    useEffect(() => {
        setLocalMinPrice(filters.minPrice?.toString() ?? "");
        setLocalMaxPrice(filters.maxPrice?.toString() ?? "");
    }, [filters.minPrice, filters.maxPrice]);

    const handleFilterChange = (field: string, value: string) => {
        const updatedFilters = {
            ...filters,
            [field]: value === "all" ? undefined : value
        };
        setFilters(updatedFilters);
    };

    const handlePrevPage = () => {
        if (metadata && metadata.currentPage > 1) {
            setFilters({ pageNumber: metadata.currentPage - 1 });
        }
    };

    const handleNextPage = () => {
        if (metadata && metadata.currentPage < metadata.totalPages) {
            setFilters({ pageNumber: metadata.currentPage + 1 });
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold bg-purple-300">Cargando productos...</div>;
    }

    return (
        <div className="min-h-screen">
            {/* Filters bar */}
            <div className="p-8 mx-auto"
                style={{ background: "#F1D0FF" }}>
                <div className="flex flex-wrap gap-12 justify-center items-center">

                    {/* Categoría */}
                    <div className="flex flex-col items-start w-[252px]">
                        <span className="text-[20px] font-bold mb-1">Categoría</span>
                        <Select
                            value={filters.categories || 'all'}
                            onValueChange={(value) => handleFilterChange('categories', value)}>
                            <SelectTrigger className="w-full bg-white border border-purple-300">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Marca */}
                    <div className="flex flex-col items-start w-[229px]">
                        <span className="text-[20px] font-bold mb-1">Marca</span>
                        <Select
                            value={filters.brands || 'all'}
                            onValueChange={(value) => handleFilterChange('brands', value)}>
                            <SelectTrigger className="w-full bg-white border border-purple-300">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                {brands.map((brand) => (
                                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Estado */}
                    <div className="flex flex-col items-start w-[215px]">
                        <span className="text-[20px] font-bold mb-1">Estado</span>
                        <Select
                            value={filters.conditions || 'all'}
                            onValueChange={(value) => handleFilterChange('conditions', value)}>
                            <SelectTrigger className="w-full bg-white border border-purple-300">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="nuevo">Nuevo</SelectItem>
                                <SelectItem value="usado">Usado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Orden por Precio */}
                    <div className="flex flex-col items-start w-[200px]">
                        <span className="text-[20px] font-bold mb-1">Ordenar por Precio</span>
                        <Select
                            value={filters.sortBy || 'all'}
                            onValueChange={(value) => handleFilterChange('sortBy', value)}>
                            <SelectTrigger className="w-full bg-white border border-purple-300">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">-</SelectItem>
                                <SelectItem value="price">Menor a Mayor</SelectItem>
                                <SelectItem value="priceDesc">Mayor a Menor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Orden por Nombre */}
                    <div className="flex flex-col items-start w-[200px]">
                        <span className="text-[20px] font-bold mb-1">Ordenar por Nombre</span>
                        <Select
                            value={filters.sortBy || 'all'}
                            onValueChange={(value) => handleFilterChange('sortBy', value)}>
                            <SelectTrigger className="w-full bg-white border border-purple-300">
                                <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">A - Z</SelectItem>
                                <SelectItem value="nameDesc">Z - A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Rango de precios */}
                    <div className="flex flex-col items-start w-[420px]">
                        <span className="text-[20px] font-bold mb-1">Rango de precios</span>
                        <div className="flex gap-2 w-full">
                            <input
                                type="number"
                                min={0}
                                value={localMinPrice}
                                onChange={e => setLocalMinPrice(e.target.value)}
                                className="bg-white border border-purple-300 p-2 rounded w-1/2"
                                placeholder="Mínimo"
                            />
                            <input
                                type="number"
                                min={0}
                                value={localMaxPrice}
                                onChange={e => setLocalMaxPrice(e.target.value)}
                                className="bg-white border border-purple-300 p-2 rounded w-1/2"
                                placeholder="Máximo"
                            />
                            <button
                                className="bg-purple-500 text-white font-semibold px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        minPrice: localMinPrice ? Number(localMinPrice) : undefined,
                                        maxPrice: localMaxPrice ? Number(localMaxPrice) : undefined,
                                        pageNumber: 1
                                    });
                                }}
                            >
                                Filtrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Productos */}
            <div className="max-w-7xl mx-auto p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.title} product={product} onClick={() => setSelectedProduct(product)} />
                ))}
            </div>

            <ProductDialog product={selectedProduct} open={!!selectedProduct} onClose={() => setSelectedProduct(null)} />

            {/* Paginación (futura implementación) */}
            <div className="flex justify-center m-12">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href='#'
                                onClick={e => {
                                    e.preventDefault();
                                    if (metadata && metadata.currentPage > 1) {
                                        handlePrevPage();
                                    }
                                }}
                                className={
                                    !metadata || metadata.currentPage <= 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>
                        <span className="px-2">
                            Página {metadata ? metadata.currentPage : 1}
                        </span>
                        <PaginationItem>
                            <PaginationNext
                                href='#'
                                onClick={e => {
                                    e.preventDefault();
                                    if (metadata && metadata.currentPage < metadata.totalPages) {
                                        handleNextPage();
                                    }
                                }}
                                className={
                                    !metadata || metadata.currentPage >= metadata.totalPages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}