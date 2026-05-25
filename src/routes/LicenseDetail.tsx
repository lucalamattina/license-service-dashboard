import { useParams } from 'react-router-dom';

export default function LicenseDetail() {
  const { id } = useParams<{ id: string }>();
  return <h1 className="text-2xl font-semibold p-8">License {id}</h1>;
}
