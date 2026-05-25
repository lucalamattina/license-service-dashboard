import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  return <h1 className="text-2xl font-semibold p-8">Product {id}</h1>;
}
