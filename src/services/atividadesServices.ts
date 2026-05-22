import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

const obterHeaders = () => {
    const token = localStorage.getItem('@FitMeet:token'); 
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const atividadesService = {
    listarTodasAtividades: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/activities`, obterHeaders());
            return response.data;
        } catch (error) {
            try {
                const response = await axios.get(`${BASE_URL}/atividades`, obterHeaders());
                return response.data;
            } catch {
                return []; 
            }
        }
    },

    buscarPreferencias: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/preferences/define`, obterHeaders());
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return null; 
            }
            throw error;
        }
    },

    salvarPreferencias: async (ids: string[]) => {
        try {
            const payload = ids; 
            console.log("Enviando IDs para o banco:", payload);

            const response = await axios.post(
                `${BASE_URL}/user/preferences/define`, 
                payload, 
                obterHeaders()
            );
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                console.error("❌ ERRO DETALHADO DO BACKEND:", error.response.data);
            }
            throw error;
        }
    }
};