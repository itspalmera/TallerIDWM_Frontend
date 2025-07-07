'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserList } from "@/interfaces/Users/UserList"

interface Props {
  usuarios: UserList[]
  onToggleActive: (id: number) => void
  onView: (id: number) => void
}

export default function UserTable({ usuarios, onToggleActive, onView }: Props) {
  return (
    <Card className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">Nombre</th>
            <th className="text-left px-4 py-2 border-b">Correo</th>
            <th className="text-left px-4 py-2 border-b">Fecha de Registro</th>
            <th className="text-left px-4 py-2 border-b">Estado</th>
            <th className="text-left px-4 py-2 border-b">Último Acceso</th>
            <th className="text-left px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{usuario.nombre}</td>
              <td className="px-4 py-2 border-b">{usuario.email}</td>
              <td className="px-4 py-2 border-b">
                {new Date(usuario.fechaRegistro).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border-b">
                {usuario.activo ? "Activo" : "Inactivo"}
              </td>
              <td className="px-4 py-2 border-b">
                {usuario.ultimoAcceso
                  ? new Date(usuario.ultimoAcceso).toLocaleString()
                  : "Nunca"}
              </td>
              <td className="px-4 py-2 border-b space-x-2">
                <Button variant="secondary" onClick={() => onView(usuario.id)}>
                  Ver
                </Button>
                <Button
                  onClick={() => onToggleActive(usuario.id)}
                  variant={usuario.activo ? "destructive" : "default"}
                >
                  {usuario.activo ? "Desactivar" : "Activar"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
