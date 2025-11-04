export class Cliente {
  idCliente?: number;
  direccion?: string;
  telefono?: string;
  nombre?: string;
  email?: string;
  dni?: string;
  fechaNacimiento?: string; // ISO: "1990-05-15"
  fechaInscripcion?: string;
  temaInteres?: string;
  estado?: string; // "ACTIVO" | "INACTIVO"
}