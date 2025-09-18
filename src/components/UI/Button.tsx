import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const baseClasses = "font-medium py-2 px-4 rounded-lg transition-colors";
  const variantClasses = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
}