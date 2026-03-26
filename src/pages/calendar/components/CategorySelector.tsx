import Text from '@/components/Text';

export type CategoryColor = 'focus' | 'quick' | 'plan' | 'drop';

const CATEGORIES: { value: CategoryColor; label: string }[] = [
  { value: 'focus', label: 'Focus' },
  { value: 'quick', label: 'Quick' },
  { value: 'plan',  label: 'Plan'  },
  { value: 'drop',  label: 'Drop'  },
];

const categoryBg: Record<CategoryColor, string> = {
  focus: 'bg-primary',
  quick: 'bg-quick',
  plan:  'bg-plan',
  drop:  'bg-drop',
};

type CategorySelectorProps = {
  selected: CategoryColor;
  onChange: (category: CategoryColor) => void;
};

export default function CategorySelector({ selected, onChange }: CategorySelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <Text variant="label">카테고리</Text>
      <div className="flex justify-between w-full">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className="flex flex-col items-center gap-1.5 transition-transform"
          >
            <div
              className={`w-8 h-8 rounded-full ${categoryBg[value]} flex items-center justify-center transition-all ${
                selected === value ? '' : 'opacity-80'
              }`}
            >
              {selected === value && (
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path
                    d="M1.5 7L6 11.5L16.5 1.5"
                    stroke="black"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <Text
              variant="caption"
              className={selected === value ? 'text-black' : 'text-gray-text'}
            >
              {label}
            </Text>
          </button>
        ))}
      </div>
    </div>
  );
}