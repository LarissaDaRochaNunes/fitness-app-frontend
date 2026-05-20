import { api } from './api';
import type { Atividade } from '../types/atividades';

export const atividadeService = {
  buscarRecomendadas: async (userId: string): Promise<Atividade[] | null> => {
    try {
      
      const resposta = await api.get<Atividade[]>(`/user/preferences${userId}`);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar dados do back-end, usando fallback local.", error);
      return null; 
    }
  }
};