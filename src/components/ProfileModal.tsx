import { useState, useEffect } from 'react';
import { Camera, Eye, Trash2, ChevronLeft, Pencil } from 'lucide-react';
import type { Atividade } from '../types/atividades';
import { CardAtividade } from './CardAtividades';

interface TipoAtividade {
    id: string;
    nome: string;
    imagemUrl: string;
}

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
    userAvatar: string;
    userEmail: string;
    userCpf: string;
    onAvatarUpload: (arquivo: File) => void;
    minhasAtividades: Atividade[];
    historicoAtividades: Atividade[];
    tiposAtividades: TipoAtividade[]; 
}

export function ProfileModal({
    isOpen,
    onClose,
    userName,
    userAvatar,
    userEmail,
    userCpf,
    onAvatarUpload,
    minhasAtividades,
    historicoAtividades,
    tiposAtividades
}: ProfileModalProps) {
    
    const [isEditing, setIsEditing] = useState(false);
    
    const [formNome, setFormNome] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formSenha, setFormSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>(['yoga']); 

    useEffect(() => {
        if (isOpen) {
            setFormNome(userName);
            setFormEmail(userEmail);
        }
    }, [isOpen, userName, userEmail]);

    if (!isOpen) return null;

    const togglePreference = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <div className="fixed inset-0 z-30 flex justify-center items-start overflow-y-auto p-4 pt-24" onClick={onClose}>
            <div className="w-full max-w-6xl p-6 md:p-10 rounded-2xl bg-neutral-100 grid gap-4" onClick={(e) => e.stopPropagation()}>

                {isEditing ? (
                    <div className="p-6 lg:p-12 max-w-xl mx-auto flex flex-col items-center">
                        <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-gray-800 font-bold hover:text-emerald-500 mb-8">
                            <ChevronLeft size={18} /> Voltar para o perfil
                        </button>

                        <div className="relative w-32 h-32 mb-8">
                            <img src={userAvatar} className="w-full h-full rounded-full object-cover border-2 border-gray-200" />
                            <label className="absolute bottom-0 right-1 bg-white border border-gray-200 p-2 rounded-full cursor-pointer">
                                <Camera size={18} className="text-gray-600" />
                                <input type="file" className="hidden" onChange={(e) => e.target.files && onAvatarUpload(e.target.files[0])} />
                            </label>
                        </div>

                        <form className="w-full space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Nome completo *</label>
                                <input type="text" value={formNome} onChange={(e) => setFormNome(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-1.5">CPF</label>
                                <input type="text" value={userCpf} disabled className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">E-mail *</label>
                                <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">Senha *</label>
                                <div className="relative">
                                    <input type={showSenha ? "text" : "password"} value={formSenha} onChange={(e) => setFormSenha(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl pr-12" />
                                    <button type="button" onClick={() => setShowSenha(!showSenha)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><Eye size={20} /></button>
                                </div>
                            </div>

                        
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-3">Preferências *</label>
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                                    {tiposAtividades.map((esporte) => {
                                        const isSelected = selectedIds.includes(esporte.id);
                                        return (
                                            <div 
                                                key={esporte.id} 
                                                onClick={() => togglePreference(esporte.id)}
                                                className="flex flex-col items-center min-w-[70px] cursor-pointer group"
                                            >
                                                <div className={`w-16 h-16 rounded-full p-0.5 border-2 transition-all overflow-hidden ${isSelected ? 'border-emerald-500 scale-110' : 'border-transparent opacity-60 grayscale'}`}>
                                                    <img src={esporte.imagemUrl} alt={esporte.nome} className="w-full h-full rounded-full object-cover" />
                                                </div>
                                                <span className={`text-[10px] font-bold mt-1.5 transition-colors ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`}>
                                                    {esporte.nome}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-emerald-500 text-white font-bold py-3.5 rounded-xl">Editar</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3.5 rounded-xl">Cancelar</button>
                            </div>

                            <button type="button" className="w-full flex items-center justify-center gap-2 text-red-500 font-bold text-sm pt-4"><Trash2 size={16} /> Desativar minha conta</button>
                        </form>
                    </div>
                ) : (

                    <div className="p-6 lg:p-12">
                        <div className="w-full flex justify-end mb-6">
                            <button onClick={() => setIsEditing(true)} className="p-3 border border-neutral-400 rounded text-neutral-400 text-xs flex items-center gap-1.5 cursor-pointer"><Pencil size={16} /> Editar perfil</button>
                        </div>
                        <div className="flex flex-col items-center text-center -mt-16 mb-10">
                            <img src={userAvatar} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl mb-4" />
                            <h2 className="text-3xl font-display mb-4">{userName}</h2>
                        </div>
    
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                <span className="text-sm font-medium text-black-500">Seu nível é</span>
                                <h3 className="text-6xl font-extrabold mt-1">8</h3>
                                <div className="mt-6 flex justify-between text-xs font-bold text-gray-500">
                                    <span>Pontos para o próximo nível</span>
                                    <span>25/50 pts</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                    <div className="w-1/2 h-full bg-emerald-500" />
                                </div>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex justify-around items-center">
                                {[5, 10, 15].map(num => (
                                    <div key={num} className="text-center">
                                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm mb-2">🥇</div>
                                        <span className="text-[10px] font-bold text-gray-500">Participou de {num} atividades</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-display mb-4">Minhas Atividades</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {minhasAtividades.map((at, i) => <CardAtividade key={i} atividade={at} layout="horizontal" />)}
                            </div>
                        </div>
                        <div className="mt-12">
                            <h3 className="text-3xl font-display mb-4">Histórico de Atividades</h3>
                            {historicoAtividades.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {historicoAtividades.map((at, i) => <CardAtividade key={i} atividade={at} layout="horizontal" />)}
                                </div>
                            ) : (
                                <div className="bg-gray-50 text-center py-12 rounded-2xl text-gray-500 font-medium border border-gray-100">
                                    Seu histórico de atividades ainda está vazio.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}