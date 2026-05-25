import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p-8">
      <h1 className="mb-2 text-2xl font-semibold">Not found</h1>
      <p className="mb-4 text-sm text-gray-500">
        That URL doesn't match any route in this dashboard.
      </p>
      <Link
        to="/licenses"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to licenses
      </Link>
    </div>
  );
}
