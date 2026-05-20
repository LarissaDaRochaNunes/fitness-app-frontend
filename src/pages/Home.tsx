import { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';
import pessoa from '../assets/pessoa.png';
import { Button } from '../components/Button';
import { PlusCircle } from 'lucide-react';
import avatar from '../assets/avatar.jpg';
import { CardAtividade } from '../components/CardAtividades';
import { ATIVIDADES_PADRAO } from '../config/AtividadesPadrao';
import type { Atividade } from '../types/atividades';

const buscarAtividadesDoUsuario = async (): Promise<Atividade[] | null> => {
    return null; 
};

export function Home() {
    const [atividadesRecomendadas, setAtividadesRecomendadas] = useState<Atividade[]>(ATIVIDADES_PADRAO);

    useEffect(() => {
        async function carregarRecomendacoes() {
            try {
                const dadosDoBack = await buscarAtividadesDoUsuario();
                if (dadosDoBack && dadosDoBack.length > 0) {
                    setAtividadesRecomendadas(dadosDoBack);
                }
            } catch (error) {
                console.error("Erro ao carregar preferências, usando padrão.", error);
            }
        }
        carregarRecomendacoes();
    }, []);

    const ATIVIDADE_GENERICA: Atividade = {
        id: 'generic-id',
        titulo: 'Exercícios',
        imagemUrl: pessoa,
        dataHora: '28/01/2025 08:00',
        participantes: 4,
        exclusivo: false,
    };


    const criarListaGenerica = (baseIdPrefix: string): Atividade[] => {
        return Array(6).fill(0).map((_, i) => ({
            ...ATIVIDADE_GENERICA,
            id: `${baseIdPrefix}-${i}`,
            exclusivo: i % 2 === 0, 
        }));
    };

    return (
        <div className='container mx-auto px-4 lg:px-20 py-6 max-w-7xl'>
            
            <header className='w-full flex justify-between items-center h-20 border-b border-gray-100 mb-10'>
                <img src={logo} alt="Logotipo FitMeet" className='p-2 rounded-2xl' />
                <div className='flex items-center gap-4'>
                    <Button className='flex items-center gap-2'> <PlusCircle size={20} /> Criar atividade</Button>
                    <a href="/perfil">
                        <img src={avatar} alt="Avatar do usuário" className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500" />
                    </a>
                </div>
            </header>

            {/* RECOMENDADOS PARA VOCÊ */}
            <div className='mb-14'>
                <h1 className='text-3xl font-display mb-4'>Recomendados para você</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {atividadesRecomendadas.slice(0, 4).map((atividade, index) => (
                        <CardAtividade key={atividade.id || index} atividade={atividade} layout="vertical" />
                    ))}
                </div>
            </div>

            {/* TIPOS DE ATIVIDADES */}
            <div className='mb-14'>
                <h1 className='text-3xl font-display mb-4'>Tipos de atividades</h1>
                <div className='flex gap-8 overflow-x-auto pb-3 scrollbar-none'>
                    {['Futebol', 'Basquete', 'Caminhada', 'Vôlei'].map((esporte, index) => (
                        <a key={esporte} className='shrink-0 grid justify-items-center gap-3 hover:scale-105 transition-transform' href="#">
                            <img className='w-20 h-20 rounded-full aspect-square object-cover shadow-sm border border-gray-150' src={`https://apibootcamp2026.sysmap.com.br/images/${index === 0 ? '1777033893392futebol.jpg' : index === 1 ? '1777033894191basquete.jpg' : index === 2 ? '1777033894224caminhada.jpg' : '1777033894312v%C3%B4lei.jpg'}`} alt={esporte} />
                            <span className='font-bold text-gray-800 text-sm'>{esporte}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* GRIDS INFERIORES: BLOCO 1 (Corrida e Ciclismo) */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 mb-12'>
                
                <div>
                    <div className='mb-4 flex justify-between items-end border-b border-gray-200 pb-2'>
                        <h2 className='text-3xl font-display mb-4'>Corrida</h2>
                        <a className='text-sm font-bold text-gray-600 hover:text-emerald-500 transition-colors' href="#">Ver mais</a>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {criarListaGenerica('corrida').map((atividade) => (
                            <CardAtividade key={atividade.id} atividade={atividade} layout="horizontal" />
                        ))}
                    </div>
                </div>

                <div>
                    <div className='mb-4 flex justify-between items-end border-b border-gray-200 pb-2'>
                        <h2 className='text-3xl font-display mb-4'>Ciclismo</h2>
                        <a className='text-sm font-bold text-gray-600 hover:text-emerald-500 transition-colors' href="#">Ver mais</a>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {criarListaGenerica('ciclismo').map((atividade) => (
                            <CardAtividade key={atividade.id} atividade={atividade} layout="horizontal" />
                        ))}
                    </div>
                </div>

            </div>

            {/* GRIDS INFERIORES: BLOCO 2 (Ioga e Musculação) */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12'>
                
                <div>
                    <div className='mb-4 flex justify-between items-end border-b border-gray-200 pb-2'>
                        <h2 className='text-3xl font-display mb-4'>Ioga</h2>
                        <a className='text-sm font-bold text-gray-600 hover:text-emerald-500 transition-colors' href="#">Ver mais</a>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {criarListaGenerica('yoga').map((atividade) => (
                            <CardAtividade key={atividade.id} atividade={atividade} layout="horizontal" />
                        ))}
                    </div>
                </div>

                <div>
                    <div className='mb-4 flex justify-between items-end border-b border-gray-200 pb-2'>
                        <h2 className='text-3xl font-display mb-4'>Musculação</h2>
                        <a className='text-sm font-bold text-gray-600 hover:text-emerald-500 transition-colors' href="#">Ver mais</a>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {criarListaGenerica('musculacao').map((atividade) => (
                            <CardAtividade key={atividade.id} atividade={atividade} layout="horizontal" />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}