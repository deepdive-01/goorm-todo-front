import Text from './Text';

type InputType = 'todo' | 'memo';

type InputFieldProps = {
  type: InputType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const inputPresets: Record<InputType, { label: string; placeholder: string }> = {
  todo: { label: '할 일', placeholder: '할 일을 입력하세요' },
  memo: { label: '메모', placeholder: '메모를 입력하세요' },
};

export default function InputField({
  type,
  value,
  onChange,
  className = '',
}: InputFieldProps) {
  const { label, placeholder } = inputPresets[type];
  
  // Text.tsx의 body variant 규격 (16px, Normal) 적용
  const bodyTextStyle = "text-[16px] font-normal";

  return (
    <div className={`flex flex-col gap-[10px] w-full ${className}`}>
      
      {/* 상단 레이블*/}
      <Text variant="label" className="text-black ml-[4px]">
        {label}
      </Text>

      {/* 인풋 필드 */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full h-[48px] px-[20px]
          
          bg-gray-ui 
          rounded-[32px] 
          
          text-black
          outline-none border-none
          
          /* 텍스트 스타일: body 규격으로 통일 */
          ${bodyTextStyle} 
          placeholder:${bodyTextStyle}
          placeholder:text-gray-text
          
          /* 포커스 시 부드러운 효과(미정) */
        `}
      />
    </div>
  );
}