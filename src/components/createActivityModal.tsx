import { useState} from 'react';
import type { ChangeEvent } from 'react';
import type { TipoAtividade } from '../pages/Home'; 

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  tiposAtividades: TipoAtividade[];
}

export function CreateActivityModal({ isOpen, onClose, tiposAtividades }: CreateActivityModalProps) {
  const [requiresApproval, setRequiresApproval] = useState<boolean>(false);
  const [activityType, setActivityType] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const jaSelecionouAlgum = activityType !== null;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl overflow-y-auto max-h-[90vh]">
        
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-display mb-4">Nova Atividade</h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
    
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Imagem <span className="text-red-500">*</span>
              </label>
              <label className="group relative flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 overflow-hidden transition-colors">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                      Alterar Imagem
                    </div>
                  </>
                ) : (
                  <>
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-gray-400 mt-1">Clique para selecionar</span>
                  </>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Título <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="Ex.: Aula de Ioga" className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea rows={3} placeholder="Como será a atividade?..." className="w-full resize-none rounded-md border border-gray-300 p-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Data <span className="text-red-500">*</span>
              </label>
              <input type="datetime-local" className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-600" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Tipo da atividade <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {tiposAtividades.map((tipo) => {
                  const esteEstaSelecionado = activityType === tipo.id;
                  
                  return (
                    <div 
                      key={tipo.id} 
                      onClick={() => setActivityType(tipo.id)}
                      className={`flex flex-col items-center cursor-pointer min-w-[70px] transition-all ${
                        !jaSelecionouAlgum 
                          ? 'opacity-100 hover:scale-105' 
                          : esteEstaSelecionado 
                            ? 'opacity-100 scale-105' 
                            : 'opacity-40 hover:opacity-70'
                      }`}
                    >
                      <img 
                        src={tipo.imagemUrl} 
                        alt={tipo.nome} 
                        className={`h-14 w-14 rounded-full object-cover border-2 transition-all ${
                          esteEstaSelecionado ? 'border-emerald-500 shadow-md' : 'border-gray-200'
                        }`} 
                      />
                      <span className={`mt-1 text-xs transition-colors ${
                        esteEstaSelecionado ? 'text-emerald-600 font-bold' : 'text-gray-600 font-medium'
                      }`}>
                        {tipo.nome}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Ponto de encontro <span className="text-red-500">*</span>
              </label>
              <div className="h-40 w-full overflow-hidden rounded-md border border-gray-300 bg-gray-100">
                <iframe title="Mapa" width="100%" height="100%" style={{ border: 0 }} loading="lazy" src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Parque%20Ibirapuera+(Ponto%20de%20Encontro)&t=&z=14&ie=UTF8&iwloc=B&output=embed" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Requer aprovação para participar? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setRequiresApproval(true)} className={`rounded-md border px-6 py-2 font-medium transition-colors ${requiresApproval ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}>Sim</button>
                <button type="button" onClick={() => setRequiresApproval(false)} className={`rounded-md border px-6 py-2 font-medium transition-colors ${!requiresApproval ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}>Não</button>
              </div>
            </div>

            <div className="mt-auto flex justify-end pt-4">
              <button type="submit" className="w-full md:w-auto rounded-md bg-[#00c48c] px-8 py-2 font-bold text-white transition-colors hover:bg-emerald-500">
                Criar
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}