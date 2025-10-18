export interface Institucion {
    id: number;
    nombre: string;
    codigo: string;
    direccion: string;
    telefono: string;
    email: string;
    director: string;
    tipo: string;
    nivel: string;
    estado: boolean;
    rif?: string;
    mision?: string;
    vision?: string;
}
