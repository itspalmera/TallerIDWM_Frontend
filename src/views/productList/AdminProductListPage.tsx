"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductServices } from "@/services/ProductServices";
import ProductTable from "@/components/ProductTable/ProductTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminProductListPage() {
  const router = useRouter();

  const { data: productos, isLoading, isError, refetch } = useQuery({
    queryKey: ["adminProductos"],
    queryFn: ProductServices.fetchAdminProducts,
  });

  if (isLoading) return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );

  if (isError) return <p className="text-red-500">Error al cargar productos</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <Button onClick={() => router.push("/admin/products/create")} className="bg-purple-500 text-white">
          Crear nuevo producto
        </Button>
      </div>
      <ProductTable productos={productos || []} refetch={refetch} />
    </div>
  );
}
