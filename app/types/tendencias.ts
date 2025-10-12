export interface Tendencias {
    message: string;
    data: Tendencia[];
}

export interface Tendencia {
    id: number;
    titulo: string;
    autor: string;
    fecha_publicacion: string;
    markdown: string;
    image_url: string;
    descripcion: string;
    sugerido_rank: null;
    popularidad: number;
    active: boolean;
}
