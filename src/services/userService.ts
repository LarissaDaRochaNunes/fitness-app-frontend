import { api } from '../services/api'; 

export const buscarDadosUsuario = async () => {
    const response = await api.get('/user');
    return response.data; 
};

export const atualizarFotoPerfil = async (arquivo: File) => {
    const formData = new FormData();
    formData.append('avatar', arquivo); 

    const response = await api.put('/user/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};