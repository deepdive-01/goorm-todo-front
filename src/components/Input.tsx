import React from 'react';
import Text from './Text';

type InputProps = {
  type?: React.HTMLInputTypeAttribute;   // input 타입 (text, password 등)
  label: string;                         // 상단 레이블
  placeholder?: string;                  // placeholder
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Input({
  type = 'text',
  label,
  placeholder = '',
  value,
  onChange,
  className = '',
}: InputProps) {
  
  const bodyTextStyle = "text-[16px] font-normal";

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      
      {/* 1. Label */}
      <Text variant="label" className="text-black">
        {label}
      </Text>

      {/* 2. Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full py-4 px-[20px]
          bg-gray-ui
          rounded-[32px]
          text-black
          outline-none border-none

          ${bodyTextStyle}
          placeholder:text-gray-text
        `}
      />
    </div>
  );
}