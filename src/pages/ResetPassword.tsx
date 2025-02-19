import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Vérifie si l'URL contient un access_token (fournit par Supabase)
    const params = new URLSearchParams(window.location.search);
    if (params.get('token_hash')) {
      setIsAuthorized(true);
    } else {
      toast.error("Unauthorized access. Please request a new reset link.");
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleUpdatePassword = async (e : React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success('Password updated successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Error updating password. Try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) return null; // Empêche le rendu si l'utilisateur n'est pas autorisé

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Set New Password</h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter a new password for your account.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleUpdatePassword}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
