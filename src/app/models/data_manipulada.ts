export interface DataManipulada {
    headers: {
        data: string;
        hora: string;
        [psp: string]: string;
    };
    data: any[];
}