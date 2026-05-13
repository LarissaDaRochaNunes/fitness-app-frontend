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
      <input type={type} id={id} placeholder={placeholder} required={required} />
    </div>
  );
}