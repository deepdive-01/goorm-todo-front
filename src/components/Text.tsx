import type { ReactNode } from 'react';

type Variant = 'title' | 'heading' | 'body' | 'label' | 'caption';

type TextProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variantMap: Record<Variant, string> = {
  title: 'text-[24px] font-bold',
  heading: 'text-[18px] font-semibold',
  body: 'text-[16px] font-normal',
  label: 'text-[14px] font-medium',
  caption: 'text-[12px] font-normal',
};

export default function Text({ children, variant = 'body', className = '' }: TextProps) {
  return <p className={`${variantMap[variant]} ${className}`}>{children}</p>;
}
