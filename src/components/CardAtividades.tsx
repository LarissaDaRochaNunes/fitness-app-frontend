import React from 'react';
import type { Atividade } from '../types/atividades';
import { Calendar, Users, Lock } from 'lucide-react';

interface CardAtividadeProps {
  atividade: Atividade;
  layout?: 'vertical' | 'horizontal'; // Nova propriedade opcional
}

export const CardAtividade: React.FC<CardAtividadeProps> = ({ atividade, layout = 'vertical' }) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div className={`bg-white border border-gray-100 rounded-xl overflow-hidden flex ${isHorizontal ? 'flex-row items-center gap-4 p-2' : 'flex-col'}`}>
      
      <div className={`relative overflow-hidden shrink-0 ${isHorizontal ? 'w-24 h-24 rounded-lg bg-amber-400' : 'aspect-video w-full'}`}>
        <img 
          src={atividade.imagemUrl} 
          alt={atividade.titulo} 
          className="w-full h-full object-cover" 
        />
        {atividade.exclusivo && (
          <div className="absolute top-2 left-2 bg-emerald-600 p-1.5 rounded-md shadow-md">
            <Lock size={12} color="white" />
          </div>
        )}
      </div>

      <div className={`flex flex-col justify-center flex-grow ${isHorizontal ? 'pr-2' : 'p-4'}`}>
        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
          {atividade.titulo}
        </h3>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-emerald-500" />
            <span>{atividade.dataHora}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-emerald-500" />
            <span>{atividade.participantes}</span>
          </div>
        </div>
      </div>

    </div>
  );
};