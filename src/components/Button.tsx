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
        flex items-center justify-center py-3 px-8 gap-2.5 rounded-full overflow-hidden transition-all active:scale-[0.98] active:opacity-90
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <Text variant="body" className="font-semibold">
        {children}
      </Text>
    </button>
  );
}