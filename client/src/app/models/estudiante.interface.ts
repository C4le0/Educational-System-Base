export interface Estudiante {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: Date;
    direccion: string;
    telefono: string;
    email?: string;
    nombreRepresentante: string;
    telefonoRepresentante: string;
    gradoEstudioId: number;
    año: number;
    periodo: string;
    estado: boolean;
    fechaIngreso: Date;
}
