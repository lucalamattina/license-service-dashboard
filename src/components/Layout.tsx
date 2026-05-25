import { NavLink, Outlet } from 'react-router-dom';

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-gray-900 font-medium'
    : 'text-gray-500 hover:text-gray-900';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center gap-8 px-8 py-3">
          <span className="text-sm font-semibold text-gray-900">
            License Service
          </span>
          <nav>
            <ul className="flex gap-5 text-sm">
              <li>
                <NavLink to="/licenses" className={linkClasses}>
                  Licenses
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" className={linkClasses}>
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={linkClasses}>
                  Products
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
