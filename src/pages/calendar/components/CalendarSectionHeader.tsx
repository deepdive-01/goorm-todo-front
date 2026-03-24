import Text from '@/components/Text';

type CalendarSectionHeaderProps = {
  title: string;
  dateLabel?: string;
};

export default function CalendarSectionHeader({ title, dateLabel }: CalendarSectionHeaderProps) {
  return (
    <header className="w-full flex justify-between items-center">
      <h2>
        <Text variant="heading">{title}</Text>
      </h2>

    {dateLabel && (
        <Text variant="caption" className="text-gray-text">{dateLabel}</Text>
    )}
    </header>
  );
}