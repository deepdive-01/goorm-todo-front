import Text from './Text';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full bg-white p-6">
      <a href="/">
        <Text variant="title" className="text-primary">
          TODO
        </Text>
      </a>
    </header>
  );
}
