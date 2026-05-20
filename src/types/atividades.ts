export interface Atividade {
  id: string;
  titulo: string;
  imagemUrl: string;
  dataHora: string; 
  participantes: number;
  exclusivo: boolean; 
}