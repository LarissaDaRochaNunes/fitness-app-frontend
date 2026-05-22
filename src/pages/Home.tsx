import { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';
import pessoa from '../assets/pessoa.png';
import avatar from '../assets/avatar.jpg';
import { CardAtividade } from '../components/CardAtividades';
import { ATIVIDADES_PADRAO } from '../config/AtividadesPadrao';
import type { Atividade } from '../types/atividades';
import { PreferencesModal } from '../components/PreferencesModal'; 
import { CreateActivityModal } from '../components/createActivityModal'; 
import { ProfileModal } from '../components/ProfileModal'; 
import { buscarDadosUsuario, atualizarFotoPerfil } from '../services/userService';

export interface TipoAtividade {
    id: string;
    nome: string;
    imagemUrl: string;
}

const TIPOS_ATIVIDADES: TipoAtividade[] = [
    { id: 'futebol', nome: 'Futebol', imagemUrl: 'https://apibootcamp2026.sysmap.com.br/images/1777033893392futebol.jpg' },
    { id: 'basquete', nome: 'Basquete', imagemUrl: 'https://apibootcamp2026.sysmap.com.br/images/1777033894191basquete.jpg' },
    { id: 'caminhada', nome: 'Caminhada', imagemUrl: 'https://apibootcamp2026.sysmap.com.br/images/1777033894224caminhada.jpg' },
    { id: 'volei', nome: 'Vôlei', imagemUrl: 'https://apibootcamp2026.sysmap.com.br/images/1777033894312v%C3%B4lei.jpg' },
];

const buscarAtividadesDoUsuario = async (): Promise<Atividade[] | null> => {
    return null; 
};

export function Home() {
    const [atividadesRecomendadas, setAtividadesRecomendadas] = useState<Atividade[]>(ATIVIDADES_PADRAO);
    const [userName, setUserName] = useState("Carregando...");
    const [userAvatar, setUserAvatar] = useState(avatar);
    const [userEmail, setUserEmail] = useState("");
    const [userCpf, setUserCpf] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isCreateActivityOpen, setIsCreateActivityOpen] = useState(false); 
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 

    useEffect(() => {
        async function carregarDadosIniciais() {
            try {
            
                const dadosDoBack = await buscarAtividadesDoUsuario();
                if (dadosDoBack && dadosDoBack.length > 0) {
                    setAtividadesRecomendadas(dadosDoBack);
                }

                const dadosUsuario = await buscarDadosUsuario();
                
                if (dadosUsuario) {
                    if (dadosUsuario.name) setUserName(dadosUsuario.name); 
                    if (dadosUsuario.avatar) setUserAvatar(dadosUsuario.avatar); 
                    if (dadosUsuario.email) setUserEmail(dadosUsuario.email); 
                    if (dadosUsuario.cpf) setUserCpf(dadosUsuario.cpf);     
                }

                setIsModalOpen(true);

            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
                setUserName("Usuário"); 
            }
        }
        carregarDadosIniciais();
    }, []);
    const handleAvatarUpload = async (arquivo: File) => {
        try {
            const previewUrl = URL.createObjectURL(arquivo);
            setUserAvatar(previewUrl);

            const resposta = await atualizarFotoPerfil(arquivo);
            if (resposta && resposta.avatar) {
                 setUserAvatar(resposta.avatar);
            }
        } catch (error) {
            console.error("Erro ao atualizar a foto de perfil:", error);
            alert("Não foi possível atualizar a foto. Tente novamente.");
        }
    };

    const handlePreferencesConfirm = (selectedIds: string[]) => {
        console.log("IDs das atividades escolhidas:", selectedIds)
    };

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
        <div className='container mx-auto px-4 lg:px-20 py-6 max-w-7xl relative'>
            
            <header className='w-full flex justify-between items-center h-20 border-b border-gray-100 mb-10'>
                <img src={logo} alt="Logotipo FitMeet" className='p-2 rounded-2xl' />
                <div className='flex items-center gap-4'>

                    <button className="bg-emerald-500 text-white font-bold px-4 py-2  flex items-center gap-2 text-sm hover:bg-emerald-600 transition-colors"
                     onClick={() => setIsCreateActivityOpen(true)}>+ Criar atividade
                    </button>
                    
                    <button 
                        onClick={() => setIsProfileModalOpen(true)} 
                        className="focus:outline-none rounded-full hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 transition-all"
                    >
                        <img 
                            src={userAvatar} 
                            alt={`Avatar de ${userName}`} 
                            className="h-14 w-14 rounded-full object-cover border-2 transition-all border-emerald-500 shadow-md" 
                        />
                    </button>
                </div>
            </header>

            <div className='mb-14'>
                <h1 className='text-3xl font-display mb-4'>Recomendados para você</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {atividadesRecomendadas.slice(0, 4).map((atividade, index) => (
                        <CardAtividade key={atividade.id || index} atividade={atividade} layout="vertical" />
                    ))}
                </div>
            </div>

            <div className='mb-14'>
                <h1 className='text-3xl font-display mb-4'>Tipos de atividades</h1>
                <div className='flex gap-8 overflow-x-auto pb-3 scrollbar-none'>
                    {TIPOS_ATIVIDADES.map((esporte) => (
                        <a key={esporte.id} className='shrink-0 grid justify-items-center gap-3 hover:scale-105 transition-transform' href="#">
                            <img className='w-20 h-20 rounded-full aspect-square object-cover shadow-sm border border-gray-150' src={esporte.imagemUrl} alt={esporte.nome} />
                            <span className='font-bold text-gray-800 text-sm'>{esporte.nome}</span>
                        </a>
                    ))}
                </div>
            </div>

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

            <CreateActivityModal 
                isOpen={isCreateActivityOpen}
                onClose={() => setIsCreateActivityOpen(false)}
                tiposAtividades={TIPOS_ATIVIDADES}
            />

            <ProfileModal 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
                userName={userName}
                userAvatar={userAvatar}
                userEmail={userEmail}
                userCpf={userCpf}
                onAvatarUpload={handleAvatarUpload}
                tiposAtividades={TIPOS_ATIVIDADES} // PASSANDO A LISTA DE ESPORTES AQUI
                minhasAtividades={criarListaGenerica('minhas').slice(0, 4)} 
                historicoAtividades={criarListaGenerica('historico')}
            />

            <PreferencesModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handlePreferencesConfirm}
            />

        </div>
    );
}