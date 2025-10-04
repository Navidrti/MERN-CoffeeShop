import { Link, useLocation } from 'react-router';
import { Home, User, Boxes } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // adjust path if needed

const Sidebar = () => {
  const location = useLocation();
  const { admin } = useContext(AuthContext);

  const defaultEmail = import.meta.env.VITE_DEFAULT_EMAIL;
  const isDefaultAdmin = admin?.email === defaultEmail;

  const navItems = [
    { name: 'Home', path: '/admin', icon: <Home size={18} /> },
    {
      name: 'Add Category',
      path: '/admin/add-category',
      icon: <Boxes size={18} />,
    },
    ...(isDefaultAdmin
      ? [
          {
            name: 'Add Admin',
            path: '/admin/add-admin',
            icon: <User size={18} />,
          },
        ]
      : []),
  ];

  return (
    <aside className="bg-base-200 min-h-screen w-36 md:w-72 p-2 md:p-4 border-r border-base-content/10 transition-all duration-300">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-base-300 transition ${
              location.pathname === item.path ? 'bg-base-300 font-bold' : ''
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
