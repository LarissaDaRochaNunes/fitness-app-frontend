import { type ComponentProps, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  id: string;
  error?: string;
}

export function Input({ label, id, type, required, error, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className={`text-sm font-medium ${error ? 'text-red-600' : 'text-[black]'}`}>
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          {...props} 
          id={id}
          type={inputType}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all
            ${error 
              ? 'border-red-600 text-red-600 placeholder:text-red-600 focus:ring-red-600' 
              : 'border-gray-300 focus:ring-[black] placeholder:text-gray-400'
            }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <span className="text-red-600 text-sm font-bold mt-1">{error}</span>}
    </div>
  );
}