import { Link } from 'react-router';
import { User } from 'lucide-react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { admin } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold text-primary font-mono tracking-tight "
          >
            CoffeeShop
          </Link>

          {admin ? (
            <div className="flex items-center gap-4">
              <span>{admin.email}</span>
              <Link to={'/'} className="btn btn-primary" onClick={handleClick}>
                <User />
                <span>Logout</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={'/login'} className="btn btn-primary">
                <User />
                <span>Admin Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
