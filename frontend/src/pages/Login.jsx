import { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await login(email, password);
    },
    [email, password, login]
  );

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-32">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold">
            Admin's Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full"
              autoComplete="current-password"
            />

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary w-full"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm text-red-700 font-medium text-center">
                  {error}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
