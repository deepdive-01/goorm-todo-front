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
        flex flex-1 items-center justify-center w-full py-3 px-8 rounded-full active:opacity-90
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