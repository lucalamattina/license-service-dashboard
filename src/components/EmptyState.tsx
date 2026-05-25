interface Props {
  message: string;
}

export function EmptyState({ message }: Props) {
  return <div className="p-8 text-sm text-gray-500">{message}</div>;
}
