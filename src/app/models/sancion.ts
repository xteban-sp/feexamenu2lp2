export class Sancion {
  idSancion?: number;
  idCliente?: number;
  nombreCliente?: string;
  dniCliente?: string;
  tipoSancion?: string;
  nroDiasSancion?: number;
  estado?: string; // 👈 Añadido: "ACTIVO" | "INACTIVO"
}