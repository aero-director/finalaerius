import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../utils/api';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  RefreshCw,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Globe,
  Lock,
  ArrowRight,
  Plane,
  AlertTriangle,
  UserCheck,
  UserX,
  X,
  ExternalLink
} from 'lucide-react';

function AdminPage() {
  const { user, token, loginUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Admin login form state (when not logged in as admin)
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Admin management state
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({ all: 0, verified: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'verified', 'pending'
  
  // Modals & Action states
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const isAdmin = user && user.role === 'admin';

  // Show temporary toast message
  const showToast = (type, text) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch users list
  const fetchUsers = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery.trim()) queryParams.set('search', searchQuery.trim());
      if (statusFilter !== 'all') queryParams.set('status', statusFilter);

      const res = await fetch(apiUrl(`/api/admin/users?${queryParams.toString()}`), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Unauthorized admin session. Please sign in again.');
        }
        throw new Error('Failed to load registered cadets list.');
      }

      const data = await res.json();
      setUsers(data.users || []);
      if (data.counts) {
        setCounts(data.counts);
      }
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setLoading(false);
    }
  }, [isAdmin, token, searchQuery, statusFilter]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, fetchUsers]);

  // Handle Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: loginIdentifier,
          password: loginPassword,
        }),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid admin credentials');
      }

      loginUser(data.user, data.token);
      showToast('success', 'Flight Operations Admin authenticated successfully!');
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // Toggle Cadet Verification
  const handleToggleVerify = async (cadet) => {
    setActionLoadingId(cadet._id);
    const targetStatus = !cadet.isVerified;

    try {
      const res = await fetch(apiUrl(`/api/admin/users/${cadet._id}/verify`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ isVerified: targetStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update verification status.');
      }

      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u._id === cadet._id ? { ...u, isVerified: targetStatus } : u))
      );

      // Update counts
      setCounts((prev) => ({
        ...prev,
        verified: targetStatus ? prev.verified + 1 : Math.max(0, prev.verified - 1),
        pending: targetStatus ? Math.max(0, prev.pending - 1) : prev.pending + 1,
      }));

      // Update modal user if viewing
      if (selectedUser && selectedUser._id === cadet._id) {
        setSelectedUser((prev) => ({ ...prev, isVerified: targetStatus }));
      }

      showToast(
        'success',
        `Cadet ${cadet.name} is now ${targetStatus ? 'VERIFIED' : 'UNVERIFIED'}`
      );
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete Cadet
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setActionLoadingId(userToDelete._id);

    try {
      const res = await fetch(apiUrl(`/api/admin/users/${userToDelete._id}`), {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete cadet user.');
      }

      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));

      setCounts((prev) => ({
        all: Math.max(0, prev.all - 1),
        verified: userToDelete.isVerified ? Math.max(0, prev.verified - 1) : prev.verified,
        pending: !userToDelete.isVerified ? Math.max(0, prev.pending - 1) : prev.pending,
      }));

      if (selectedUser && selectedUser._id === userToDelete._id) {
        setSelectedUser(null);
      }

      showToast('success', `Cadet account for ${userToDelete.name} deleted.`);
      setUserToDelete(null);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // ==========================================
  // VIEW: ADMIN LOGIN (IF NOT ADMIN)
  // ==========================================
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#060e22] via-[#0d1a3f] to-[#1a2d6b] flex items-center justify-center p-4 py-12 relative overflow-hidden font-['Montserrat',sans-serif]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-lg relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl">
              <Shield className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                Restricted Access
              </span>
              <h1 className="text-3xl font-black text-white uppercase tracking-tight mt-2">
                Flight Operations Admin Deck
              </h1>
              <p className="text-blue-200/80 text-xs sm:text-sm font-medium mt-1">
                Enter authorized administrator credentials to manage cadet accounts & certifications
              </p>
            </div>
          </div>

          {/* Login Form Box */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-slate-100">
            {loginError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Admin Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#203a8c] transition"
                    placeholder="Enter admin email or username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Admin Security Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#203a8c] transition"
                    placeholder="••••••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 px-4 bg-[#203a8c] hover:bg-blue-900 active:scale-[0.99] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {loginLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authenticate Admin Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <Link to="/profile" className="text-xs font-bold text-slate-500 hover:text-[#203a8c] transition">
                ← Return to Student Pilot Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED ADMIN OPERATIONS DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50/80 py-10 px-4 sm:px-6 lg:px-8 font-['Montserrat',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Toast Alert Notification */}
        {toastMessage && (
          <div
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border animate-in slide-in-from-bottom-5 duration-300 ${
              toastMessage.type === 'error'
                ? 'bg-red-900 text-white border-red-700'
                : 'bg-emerald-900 text-white border-emerald-700'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-bold">{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-3 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* OPERATIONS HEADER BANNER */}
        <div className="bg-gradient-to-r from-[#07122a] via-[#102047] to-[#1e3a8a] rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-blue-900/40">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[11px] font-bold uppercase tracking-wider w-fit">
                <Plane className="w-3.5 h-3.5 text-cyan-400" />
                <span>Aerius Flight Operations Command</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Cadet Operations & Registry Control Deck
              </h1>
              <p className="text-xs sm:text-sm text-blue-200/90 max-w-2xl font-medium leading-relaxed">
                Manage registered pilot cadets, inspect personal dossier details, grant or revoke official DGCA verification tags, and manage active accounts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/profile"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition border border-white/15 flex items-center gap-2"
              >
                <span>My Profile</span>
              </Link>
              <button
                onClick={logoutUser}
                className="px-4 py-2.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Deck</span>
              </button>
            </div>
          </div>
        </div>

        {/* METRICS & QUICK KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Cadets */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enrolled Cadets</p>
              <p className="text-3xl font-black text-slate-900">{counts.all}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#203a8c] flex items-center justify-center border border-blue-100">
              <Users className="w-7 h-7" />
            </div>
          </div>

          {/* Verified Cadets */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Official Verified Cadets</p>
              <p className="text-3xl font-black text-emerald-700">{counts.verified}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>

          {/* Pending Verification */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Verification</p>
              <p className="text-3xl font-black text-amber-700">{counts.pending}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <ShieldAlert className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* SEARCH, FILTER & TABLE CONTAINER */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200/80 overflow-hidden">
          {/* Controls Bar */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cadets by name, email, phone, or country..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#203a8c] transition"
              />
            </div>

            {/* Filter Pills & Refresh */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                    statusFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  All ({counts.all})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('verified')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                    statusFilter === 'verified'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Verified ({counts.verified})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                    statusFilter === 'pending'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Pending ({counts.pending})
                </button>
              </div>

              <button
                type="button"
                onClick={fetchUsers}
                title="Refresh List"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Cadets Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Cadet Identity</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Location & Age</th>
                  <th className="py-4 px-6">Enrolled Date</th>
                  <th className="py-4 px-6">Verification Standing</th>
                  <th className="py-4 px-6 text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 border-3 border-[#203a8c]/20 border-t-[#203a8c] rounded-full animate-spin" />
                        <span className="text-xs uppercase font-bold tracking-widest">
                          Loading Cadets Registry...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users className="w-10 h-10 text-slate-300 stroke-[1.5]" />
                        <p className="text-sm font-bold text-slate-600">No cadet records found</p>
                        <p className="text-xs text-slate-400">
                          Try searching for another query or changing the filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((cadet) => (
                    <tr
                      key={cadet._id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Cadet Identity */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-[#0b1633] text-white flex items-center justify-center font-black uppercase text-sm flex-shrink-0 overflow-hidden border border-slate-200">
                            {cadet.avatar ? (
                              <img
                                src={cadet.avatar}
                                alt={cadet.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>{cadet.name ? cadet.name.charAt(0) : 'C'}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{cadet.name}</p>
                            <p className="text-[11px] text-slate-400 font-mono">
                              @{cadet.username || cadet.email.split('@')[0]}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-800">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate max-w-[180px]" title={cadet.email}>
                            {cadet.email}
                          </span>
                        </div>
                        {cadet.phone ? (
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{cadet.phone}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">No phone added</span>
                        )}
                      </td>

                      {/* Location & Age */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span>{cadet.country || 'India'}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 block">
                          {cadet.age ? `${cadet.age} Yrs` : 'Age N/A'}
                        </span>
                      </td>

                      {/* Enrolled Date */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600 font-medium text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {cadet.createdAt
                              ? new Date(cadet.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : 'Recent'}
                          </span>
                        </div>
                      </td>

                      {/* Verification Standing (Tag) */}
                      <td className="py-4 px-6">
                        {cadet.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-full text-xs font-black uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                            <span>Unverified</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Toggle Verification Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleVerify(cadet)}
                            disabled={actionLoadingId === cadet._id}
                            title={cadet.isVerified ? 'Revoke Verification' : 'Verify Cadet'}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
                              cadet.isVerified
                                ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                            }`}
                          >
                            {actionLoadingId === cadet._id ? (
                              <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : cadet.isVerified ? (
                              <>
                                <UserX className="w-3.5 h-3.5" />
                                <span>Unverify</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Verify</span>
                              </>
                            )}
                          </button>

                          {/* View Full Dossier */}
                          <button
                            type="button"
                            onClick={() => setSelectedUser(cadet)}
                            title="View Cadet Dossier"
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete Cadet */}
                          <button
                            type="button"
                            onClick={() => setUserToDelete(cadet)}
                            title="Delete Cadet Record"
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CADET DOSSIER MODAL */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* Modal Banner Header */}
              <div className="bg-gradient-to-r from-[#07122a] to-[#1e3a8a] p-6 text-white relative">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-2xl font-black uppercase overflow-hidden">
                    {selectedUser.avatar ? (
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{selectedUser.name?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black">{selectedUser.name}</h3>
                      {selectedUser.isVerified ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <p className="text-xs text-blue-200 font-mono">
                      @{selectedUser.username || selectedUser.email.split('@')[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body Details */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Verification Status Banner */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between ${
                    selectedUser.isVerified
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedUser.isVerified ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-amber-600" />
                    )}
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider">
                        {selectedUser.isVerified
                          ? 'Official Verified Cadet'
                          : 'Pending Admin Verification'}
                      </p>
                      <p className="text-[11px] font-medium opacity-80">
                        {selectedUser.isVerified
                          ? 'This cadet displays the verified badge across training modules'
                          : 'Mark as verified to authorize verified credentials on profile'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleVerify(selectedUser)}
                    disabled={actionLoadingId === selectedUser._id}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                      selectedUser.isVerified
                        ? 'bg-amber-200/60 hover:bg-amber-200 text-amber-900'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {selectedUser.isVerified ? 'Unverify' : 'Verify Cadet'}
                  </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Email Address
                    </span>
                    <span className="font-semibold text-slate-900 break-all">{selectedUser.email}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Phone Number
                    </span>
                    <span className="font-semibold text-slate-900">
                      {selectedUser.phone || 'Not provided'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Age & Country
                    </span>
                    <span className="font-semibold text-slate-900">
                      {selectedUser.age ? `${selectedUser.age} Yrs • ` : ''}
                      {selectedUser.country || 'India'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Registered On
                    </span>
                    <span className="font-semibold text-slate-900">
                      {selectedUser.createdAt
                        ? new Date(selectedUser.createdAt).toLocaleString()
                        : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setUserToDelete(selectedUser);
                      setSelectedUser(null);
                    }}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Cadet Record</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION DIALOG */}
        {userToDelete && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-red-100 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-slate-900 uppercase">
                  Confirm Cadet Deletion
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Are you sure you want to permanently delete the cadet account for{' '}
                  <strong className="text-slate-900">{userToDelete.name}</strong> (
                  <span className="font-mono text-xs">{userToDelete.email}</span>)?
                  This action is irreversible.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUserToDelete(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={actionLoadingId === userToDelete._id}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-red-900/20 flex items-center gap-2 cursor-pointer"
                >
                  {actionLoadingId === userToDelete._id ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Permanently Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPage;
