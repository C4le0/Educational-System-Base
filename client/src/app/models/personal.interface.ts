export interface Personal {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    cargo: 'Docente' | 'Administrativo' | 'Obrero';
    fechaIngreso: Date;
    estado: boolean;
    email: string;
    telefono: string;
}
