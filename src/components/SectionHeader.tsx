import Text from './Text';

type SectionHeaderProps = {
  title: string;
  rightLabel?: string;
  onRightPress?: () => void;
};

export default function SectionHeader({ title, rightLabel, onRightPress }: SectionHeaderProps) {
  const isButton = !!onRightPress;

  return (
    <header className="w-full flex justify-between items-center">
      <h2>
        <Text variant="heading">{title}</Text>
      </h2>

      {rightLabel &&
        (isButton ? (
          <button onClick={onRightPress} className="cursor-pointer">
            <Text className="text-primary hover:underline">{rightLabel}</Text>
          </button>
        ) : (
          <Text className="text-gray-text">{rightLabel}</Text>
        ))}
    </header>
  );
}
