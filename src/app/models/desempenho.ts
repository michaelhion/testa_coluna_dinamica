import { InfoDesempenho } from "./info-desempenho";

export interface Transacao {
    data_trn: string;
    hora: string;
    info_desempenho: InfoDesempenho;
}