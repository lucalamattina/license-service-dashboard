interface Props {
  label?: string;
}

export function LoadingState({ label = 'Loading…' }: Props) {
  return (
    <div className="flex items-center gap-2 p-8 text-sm text-gray-500">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      <span>{label}</span>
    </div>
  );
}
