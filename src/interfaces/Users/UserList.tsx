export interface UserList {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  region?: string;
  comuna?: string;

  activo: boolean;
  fechaRegistro: string;     // ISO string, ej: "2024-06-01T12:00:00Z"
  ultimoAcceso: string | null;
}
