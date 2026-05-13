interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  required?: boolean;
}

export function Input({ label, type, placeholder, id, required=false }: InputProps) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} required={required} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black] focus:border-transparent transition-all" />
    </div>
  );
}