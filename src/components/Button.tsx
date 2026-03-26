import Text from './Text';

type ButtonVariant = 'primary' | 'quick' | 'gray';

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
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white shadow-sm', 
    quick: 'bg-quick text-white shadow-sm',
    gray: 'bg-gray-ui text-black shadow-sm', 
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