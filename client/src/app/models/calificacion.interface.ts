export interface Calificacion {
    id: number;
    estudianteId: number;
    materiaId: number;
    periodoId: number;
    nota: number;
    observaciones?: string;
    fechaRegistro: Date;
    docenteId: number;
    tipoEvaluacion: 'Parcial' | 'Final' | 'Trabajo' | 'Proyecto' | 'Examen';
    ponderacion: number; // Porcentaje que representa esta calificación
    estado: 'Activa' | 'Anulada';
}
