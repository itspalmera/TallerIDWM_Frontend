"use client";

import { useEffect, useState } from "react";
import { useOrderStore } from "@/stores/OrderStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function OrderHistoryPage() {
  const { orders, loading, fetchOrders, filters, setFilters } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleSearch = () => {
    setFilters({
      ...filters,
      registeredFrom: dateFrom || undefined,
      registeredTo: dateTo || undefined,
    });
  };
  return (
    <div className="p-4 mt-20 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Historial de Pedidos</h1>
      <div className="flex gap-4 flex-wrap mb-4">
        <Input
          type="text"
          placeholder="Buscar por dirección o ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border p-2 rounded"
        />
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border p-2 rounded"
        />
        <Button
          onClick={handleSearch}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Buscar
        </Button>
      </div>

      {loading ? (
        <p>Cargando pedidos...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No hay pedidos.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.address
                      ? `${order.address.street} ${order.address.number}, ${order.address.commune}`
                      : "-"}
                  </TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="text-blue-600"
                      // onClick={() => ...}
                    >
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

    </div>
  );
}