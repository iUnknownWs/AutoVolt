export interface Tendencias {
    count: number;
    next: string | null;
    previous: string | null;
    results: Tendencia[];
}

export interface TendenciaDetail {
    message: string;
    data: Tendencia;
}

export interface Tendencia {
    id: number;
    titulo: string;
    autor: string;
    fecha_publicacion: Date;
    markdown: string;
    image_url: string;
    descripcion: string;
    sugerido_rank: number;
    popularidad: number;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}
