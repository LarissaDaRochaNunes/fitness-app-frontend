import { api } from './api';

export const atividadesService = {

  buscarPreferencias: async (): Promise<any> => {
    const response = await api.get('/usuarios/preferencias');
    return response.data;
  },

  salvarPreferencias: async (selectedIds: string[]): Promise<any> => {
    const response = await api.post('/user/preferences/define', {
      atividadesIds: selectedIds, 
    });
    return response.data;
  }
};