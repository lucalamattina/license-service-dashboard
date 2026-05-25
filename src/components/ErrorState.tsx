interface Props {
  error: unknown;
  onRetry?: () => void;
}

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Something went wrong.';
}

export function ErrorState({ error, onRetry }: Props) {
  return (
    <div className="p-8">
      <p className="text-sm text-red-700">{messageOf(error)}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          Retry
        </button>
      )}
    </div>
  );
}
