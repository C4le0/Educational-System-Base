export interface GradoEstudioRelacion {
    id: number;
    gradoEstudioId: number;
    personalId?: number;    // Para docentes
    estudianteId?: number;  // Para estudiantes
    año: number;
    periodo: string;
    estado: boolean;
}
