import type { ComponentProps, ReactNode } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full
         bg-[#10B981] 
         cursor-pointer
         hover:bg-[#059669] 
         text-white 
         font-semibold 
         py-3 
         px-6 
         rounded-md 
         transition duration-200
   
        ${className}
      `}
    >
      {children}
    </button>
  );
}