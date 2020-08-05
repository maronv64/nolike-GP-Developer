export interface Todo {
}

export interface Archivo{
    nombre?:string;
    ruta?:string;
    fecha?:string;
    puntuacion?:number;
}

export interface Usuario{
    nombre?:string;
    correo?:string;
    avatar?:string;
    galeria?: Archivo[];
}