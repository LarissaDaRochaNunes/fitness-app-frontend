import type { Atividade } from '../types/atividades';
import alongamento from '..//assets/alongamento.jpg';
import ioga from '../assets/ioga.jpg';
import jump from '..//assets/jump.jpg';
import pilates from '..//assets/pilates.jpg';

export const ATIVIDADES_PADRAO: Atividade[] = [
  {
    id: '1',
    titulo: 'Jump',
    imagemUrl: jump,
    dataHora: '28/09/2026 08:00',
    participantes: 0,
    exclusivo: true,
  },
  {
    id: '2',
    titulo: 'Ioga',
    imagemUrl: ioga,
    dataHora: '28/08/2026 08:00',
    participantes: 0,
    exclusivo: false,
  },
  
    {
    id: '3',
    titulo: 'Alongamento',
    imagemUrl: alongamento,
    dataHora: '28/01/2027 08:00',
    participantes: 0,
    exclusivo: true,
  },

    {
    id: '4',
    titulo: 'Pilates',
    imagemUrl: pilates,
    dataHora: '16/08/2026 08:00',
    participantes: 0,
    exclusivo: false,
  },
];