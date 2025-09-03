export interface ResponseData<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface DataObject {
    id: number;
    name: string;
}