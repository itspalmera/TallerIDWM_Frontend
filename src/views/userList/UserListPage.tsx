
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const UserListPage = () => {
  return (
    <div>
      {/* Titulo y subtitulo */}
        <h1 className="text-2xl md:text-[30px] font-medium mb-2 text-center md:text-left">Gestión de Usuarios</h1>
            <Table>
        <TableCaption>Lista de usuarios.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Ver Perfil</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Pamela Vera</TableCell>
            <TableCell>pamela@example.com</TableCell>
            <TableCell>Activado</TableCell>
            <TableCell>Ver</TableCell>
            </TableRow>
            <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell>Samuel Fuentes</TableCell>
            <TableCell>samuel@example.com</TableCell>
            <TableCell>Desactivado</TableCell>
            <TableCell>Ver</TableCell>
            </TableRow>
            <TableRow>
            <TableCell className="font-medium">3</TableCell>
            <TableCell>Juan Pérez</TableCell>
            <TableCell>juan@example.com</TableCell>
            <TableCell>Activado</TableCell>
            <TableCell>Ver</TableCell>
            </TableRow>
            <TableRow>
            <TableCell className="font-medium">4</TableCell>
            <TableCell>María López</TableCell>
            <TableCell>maria@example.com</TableCell>
            <TableCell>Activado</TableCell>
            <TableCell>Ver</TableCell>
            </TableRow>
        </TableBody>
        </Table>
    </div>
  );
};