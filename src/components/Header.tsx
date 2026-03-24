import Text from './Text';

export default function Header() {
  return (
    <header className="w-full bg-white p-6">
      <a href="/">
        <Text variant="title" className="text-primary">
          TODO
        </Text>
      </a>
    </header>
  );
}
