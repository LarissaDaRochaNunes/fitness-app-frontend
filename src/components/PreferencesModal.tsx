import React, { useState } from 'react';
import alongamento from '..//assets/alongamento.jpg';
import ioga from '..//assets/ioga.jpg';
import jump from '..//assets/jump.jpg';
import pilates from '..//assets/pilates.jpg';

interface Activity {
  id: string;
  name: string;
  imageUrl: string;
}

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedIds: string[]) => void;
}

const AVAILABLE_ACTIVITIES: Activity[] = [
  { id: '1', name: 'Futebol', imageUrl: 'https://apibootcamp2026.sysmap.com.br/images/1777033893392futebol.jpg' },
  { id: '2', name: 'Basquete', imageUrl: 'https://apibootcamp2026.sysmap.com.br/images/1777033894191basquete.jpg' },
  { id: '3', name: 'Caminhada', imageUrl: 'https://apibootcamp2026.sysmap.com.br/images/1777033894224caminhada.jpg' },
  { id: '4', name: 'Vôlei', imageUrl: 'https://apibootcamp2026.sysmap.com.br/images/1777033894312v%C3%B4lei.jpg' },
  { id: '5', name: 'Yoga', imageUrl: ioga },
  { id: '6', name: 'Jump', imageUrl: jump },
  { id: '7', name: 'Alongamento', imageUrl: alongamento },
  { id: '8', name: 'Pilates', imageUrl: pilates},
];

export const PreferencesModal: React.FC<PreferencesModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggleActivity = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedActivities);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      
      <div className="bg-white rounded-md shadow-2xl max-w-2xl w-full p-8 flex flex-col items-center border border-gray-100 transform transition-all">
        
        <h2 className="text-3xl font-display mb-4">
          Selecione as suas atividades preferidas
        </h2>

        <div className="grid grid-cols-4 gap-x-8 gap-y-6 mb-10 w-full justify-items-center">
          {AVAILABLE_ACTIVITIES.map((activity) => {
            const isSelected = selectedActivities.includes(activity.id);
            return (
              <div
                key={activity.id}
                onClick={() => handleToggleActivity(activity.id)}
                className="flex flex-col items-center space-y-2 cursor-pointer group select-none"
              >
                <div
                  className={`w-20 h-20 rounded-full overflow-hidden transition-all duration-200 relative
                    ${isSelected 
                      ? 'ring-4 ring-[#00cc99] scale-95 shadow-md' 
                      : 'ring-2 ring-transparent group-hover:scale-105 group-hover:ring-gray-300'
                    }`}
                >
                  <img
                    src={activity.imageUrl}
                    alt={activity.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#00cc99]/10 flex items-center justify-center" />
                  )}
                </div>

                <span className={`text-sm font-semibold transition-colors ${isSelected ? 'text-[#00cc99]' : 'text-gray-700'}`}>
                  {activity.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 w-full max-w-md justify-center">
          <button
            onClick={handleConfirm}
            className="bg-[#00cc99] hover:bg-[#00b386] text-white font-bold py-3 px-8 rounded-md w-full transition-all active:scale-98 shadow-sm"
          >
            Confirmar
          </button>
          
          <button
            onClick={onClose}
            className="border border-[#00cc99] text-[#00cc99] hover:bg-emerald-50/40 font-semibold py-3 px-8 rounded-md w-full transition-all active:scale-98"
          >
            Pular
          </button>
        </div>

      </div>
    </div>
  );
};