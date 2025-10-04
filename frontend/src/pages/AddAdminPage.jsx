import React from 'react';
import { useAdminManager } from '../hooks/useAdminManager';
import { useAuthContext } from '../hooks/useAuthContext';

const AddAdminPage = () => {
  const { admin } = useAuthContext(); // ✅ get logged-in admin
  const {
    email,
    setEmail,
    password,
    setPassword,
    editEmail,
    setEditEmail,
    editPassword,
    setEditPassword,
    admins,
    loading,
    editingAdmin,
    setEditingAdmin,
    defaultEmail,
    handleAddAdmin,
    handleDelete,
    handleEdit,
    handleUpdateAdmin,
  } = useAdminManager();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 px-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Admin</h2>

        <form onSubmit={handleAddAdmin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
            autoComplete="new-password"
          />
          <button className="btn btn-primary w-full" type="submit">
            Add Admin
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Existing Admins
          </h3>

          {loading ? (
            <div className="flex justify-center mt-6">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : (
            <ul className="space-y-3">
              {admins.map((a) => (
                <li
                  key={a._id}
                  className="p-4 bg-base-200 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                >
                  <div>
                    <span className="font-medium">{a.email}</span>
                    {a.email === defaultEmail && (
                      <span className="ml-2 text-xs text-green-500">
                        (Default)
                      </span>
                    )}
                  </div>

                  {admin?.email === defaultEmail &&
                    a.email !== defaultEmail && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(a)}
                          className="btn btn-outline btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a._id)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {editingAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Edit Admin
            </h3>
            <form onSubmit={handleUpdateAdmin} className="space-y-4">
              <input
                type="email"
                className="input input-bordered w-full"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="input input-bordered w-full"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="New Password"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdminPage;
