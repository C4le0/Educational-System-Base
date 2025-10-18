export interface Periodo {
    id: number;
    nombre: string;
    año: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: 'Activo' | 'Inactivo' | 'Finalizado';
    descripcion?: string;
}

export interface PeriodoCalificacion {
    id: number;
    periodoId: number;
    estudianteId: number;
    materiaId: number;
    nota: number;
    observaciones?: string;
    fechaRegistro: Date;
    docenteId: number;
}
