import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Licenses from './routes/Licenses';
import LicenseDetail from './routes/LicenseDetail';
import Users from './routes/Users';
import UserDetail from './routes/UserDetail';
import Products from './routes/Products';
import ProductDetail from './routes/ProductDetail';
import NotFound from './routes/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/licenses" replace /> },
  { path: '/licenses', element: <Licenses /> },
  { path: '/licenses/:id', element: <LicenseDetail /> },
  { path: '/users', element: <Users /> },
  { path: '/users/:id', element: <UserDetail /> },
  { path: '/products', element: <Products /> },
  { path: '/products/:id', element: <ProductDetail /> },
  { path: '*', element: <NotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
