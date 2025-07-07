'use client'

import { useQuery } from '@tanstack/react-query'
import { UserService, UserServiceFilter } from '@/services/UserServices'
import { Skeleton } from '@/components/ui/skeleton'
import { User } from '@/interfaces/Users/User'
import { UserList } from '@/interfaces/Users/UserList'
import UserFilter from '@/components/UserFilter/UserFilter'
import UserTable from '@/components/UserTable/UserTable'
import { useState } from 'react'
import { UserFilters } from '@/interfaces/Users/UserFilters'
import { toast } from 'sonner'



export default function UserListPage() {
  const [filters, setFilters] = useState<UserFilters>({})

  const {
    data: usuariosRaw,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['usuarios', filters],
    queryFn: () => UserService.fetchUsers(filters),
  })

  const handleDeactivate = async (id: number) => {
    try {
      await UserServiceFilter.deactivateUser(id)
      toast.success('Usuario desactivado correctamente')
      // refetch si usas TanStack Query
    } catch (error) {
      toast.error('Error al desactivar el usuario')
    }
  }

  interface RawUser {
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    region?: string;
    commune?: string;
    active?: boolean;
    registered?: string;
    lastLogin?: string | null;
  }


  const usuariosAdaptados: UserList[] | undefined = (usuariosRaw as RawUser[])?.map((user, index) => ({
    id: index,
    nombre: `${user.name} ${user.lastName}`,
    email: user.email,
    telefono: user.phone || '-',
    region: user.region || '-',
    comuna: user.commune || '-',
    registrado: user.registered || new Date(),
    estado: user.active ? 'nuevo' : 'usado',
    activo: user.active ?? true,
    fechaRegistro: user.registered ?? new Date().toISOString(),
    ultimoAcceso: user.lastLogin ?? null,
  }));

  if (isLoading) {
    return (
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 pr-4 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="col-span-9 space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-red-600">Error al cargar usuarios</h1>
          <p className="text-red-500">No se pudieron obtener los datos de los usuarios.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-12 gap-8 items-start min-h-screen">
        <div className="col-span-3 pr-6">
          <div className="bg-white p-4 rounded-lg shadow-md h-[calc(100vh-100px)] overflow-y-auto sticky top-6">
            <UserFilter onFilterChange={setFilters} />
          </div>
        </div>
        <div className="col-span-9">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Listado de Usuarios</h1>
            {usuariosAdaptados && usuariosAdaptados.length > 0 ? (
              <UserTable usuarios={usuariosAdaptados} onToggleActive={handleDeactivate} onView={() => {}} />
            ) : (
              <p className="text-muted-foreground">No se encontraron usuarios con los filtros seleccionados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
