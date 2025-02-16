import React from 'react';

export interface ZoomOption {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

interface ZoomControlsProps {
  options: ZoomOption[];
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function ZoomControls({
  options,
  value,
  onChange,
  className = '',
}: ZoomControlsProps) {
  return (
    <div className={`inline-flex rounded-full bg-black/20 p-1 ${className}`}>
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            flex items-center gap-2 px-4 py-1.5 rounded-full
            transition-all duration-200 text-sm
            ${
              value === option.value
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }
            ${index === 0 ? 'mr-0.5' : index === options.length - 1 ? 'ml-0.5' : 'mx-0.5'}
          `}
        >
          {option.icon}
          <span className="font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
