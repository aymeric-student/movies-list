export interface Cast {
    id: number;
    name: string;
}

export interface Crew {
    id: number;
    name: string;
}

export interface ActorsResponse {
    cast: Cast[]
    crew: Crew[]
}