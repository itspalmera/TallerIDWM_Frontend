"use client";

import { ProductListItem } from "@/interfaces/Products/ProductListItem";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProductServices } from "@/services/ProductServices";
import { toast } from "sonner";

interface Props {
  productos: ProductListItem[];
  refetch: () => void;
}

export default function ProductTable({ productos, refetch }: Props) {
  const router = useRouter();
  console.log("🔍 Productos renderizados en ProductTable:", productos.map(p => p.id));

    if (!productos || productos.length === 0) {
        return <p className="text-center text-gray-500">No hay productos disponibles.</p>;
    }
  const handleDelete = async (id: number) => {
    try {
      await ProductServices.deleteProduct(id);
      toast.success("Producto ocultado correctamente.");
      refetch();
    } catch (error) {
      toast.error("Error al ocultar producto.");
    }
  };

  return (
    <Card className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border-b">Título</th>
            <th className="px-4 py-2 text-left border-b">Precio</th>
            <th className="px-4 py-2 text-left border-b">Stock</th>
            <th className="px-4 py-2 text-left border-b">Categoría</th>
            <th className="px-4 py-2 text-left border-b">Marca</th>
            <th className="px-4 py-2 text-left border-b">Estado</th>
            <th className="px-4 py-2 text-left border-b">Visible</th>
            <th className="px-4 py-2 text-left border-b">Última Modificación</th>
            <th className="px-4 py-2 text-left border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {productos.map((producto) => {
            if (!producto.id) return null; // Protección por si id es undefined

            return (
            <tr key={producto.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{producto.title}</td>
                <td className="px-4 py-2 border-b">${producto.price}</td>
                <td className="px-4 py-2 border-b">{producto.stock}</td>
                <td className="px-4 py-2 border-b">{producto.category}</td>
                <td className="px-4 py-2 border-b">{producto.brand}</td>
                <td className="px-4 py-2 border-b capitalize">{producto.condition}</td>
                <td className="px-4 py-2 border-b">{producto.isVisible ? "Sí" : "No"}</td>
                <td className="px-4 py-2 border-b">{producto.updatedAt || producto.createdAt}</td>
                <td className="px-4 py-2 border-b space-x-2">
                <Button onClick={() => router.push(`/admin/editProduct/${producto.id}`)}>Editar</Button>
                <Button variant="destructive" onClick={() => handleDelete(producto.id)}>Eliminar</Button>
                </td>
            </tr>
            );
        })}
        </tbody>

      </table>
    </Card>
  );
}
