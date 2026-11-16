import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, Plane, AlertCircle, Shield } from 'lucide-react';
import { apiUrl } from '../utils/api';

function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';
  const redirectNotice = location.state?.message;

  // If already logged in, redirect to destination
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier, password }),
        credentials: 'include',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.error) {
          if (Array.isArray(data.error)) {
            throw new Error(data.error.map((err) => err.message).join(', '));
          }
          throw new Error(data.error);
        }
        throw new Error('Login failed. Please check your credentials.');
      }

      // Save user to context & local storage
      loginUser(data.user, data.token);

      // Successfully authenticated -> User lands on target page or profile
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1633] via-[#162758] to-[#203a8c] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Top Header Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl mb-4">
            <Plane className="w-8 h-8 text-red-500 transform -rotate-45" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Welcome Back</h1>
          <p className="text-blue-200 text-sm mt-1">Sign in to access your flight profile & training modules</p>
        </div>

        {/* Main Login Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {redirectNotice && (
            <div className="mb-6 flex items-start gap-3 p-3.5 bg-blue-50 border border-blue-200 text-[#1e3a8a] rounded-xl text-sm font-semibold">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#203a8c]" />
              <span>{redirectNotice}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#203a8c] focus:border-transparent transition"
                  placeholder="Enter your email or username"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">No email verification needed — use email as your username.</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#203a8c] focus:border-transparent transition"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 bg-[#203a8c] hover:bg-[#182c6b] active:scale-[0.99] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Log In to Cadet Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Option: Login as Admin */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              to="/admin"
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200/90 active:scale-[0.99] text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
            >
              <Shield className="w-4 h-4 text-red-600" />
              <span>Login as Administrator</span>
            </Link>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-bold text-[#e31e24] hover:text-[#b7151a] hover:underline transition">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Fast Links */}
        <div className="mt-6 text-center text-xs text-blue-200/80 flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5 text-blue-300" />
          <span>Cadet login unlocks RTR 2 Learn curriculum and RTS 2 Flight Simulator</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
