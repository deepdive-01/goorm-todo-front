import Text from './Text';

type ButtonVariant = 'save' | 'cancel' | 'delete';

type ButtonProps = {
  children: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  onClick,
  variant = 'save',
  className = '',
  type = 'button',
}: ButtonProps) {
  
  const variantStyles: Record<ButtonVariant, string> = {
    save: 'bg-primary text-white shadow-sm', 
    cancel: 'bg-white text-black border border-[#f0f0f0] shadow-sm',
    delete: 'bg-quick text-white shadow-sm', 
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex items-center justify-center
        w-full h-[43px] px-[32px] py-[12px] gap-[10px] 
        
        rounded-[9999px] 
        overflow-hidden 
        
        transition-all active:scale-[0.98] active:opacity-90
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <Text variant="body" className="leading-none font-medium">
        {children}
      </Text>
    </button>
  );
}