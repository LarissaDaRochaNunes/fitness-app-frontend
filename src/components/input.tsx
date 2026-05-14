import { type ComponentProps, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  id: string;
}

export function Input({ label, id, type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-medium text-[#374151]">
        {label}
      </label>
      
      <div className="relative">
        <input
          {...props} 
          id={id}
          type={inputType}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[black] focus:border-transparent transition-all placeholder:text-gray-400"
        />

        {/* Botão de mostrar/esconder senha (só aparece se o tipo for password) */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}