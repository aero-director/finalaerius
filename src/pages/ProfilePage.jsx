import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../utils/api';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Globe,
  Camera,
  LogOut,
  Edit3,
  Check,
  X,
  Radio,
  Sliders,
  Shield,
  Plane,
  Award,
  Sparkles,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Trash2,
  ChevronRight,
  Headphones,
  Compass
} from 'lucide-react';

function ProfilePage() {
  const { user, token, logoutUser, updateUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    age: '',
    country: '',
  });

  const [avatarPreview, setAvatarPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Sync state with user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        age: user.age !== undefined && user.age !== null ? user.age : '',
        country: user.country || '',
      });
      setAvatarPreview(user.avatar || '');
    }
  }, [user]);

  // Protect route: if not logged in and done loading, redirect to /login
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [authLoading, user, navigate]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Image Upload & Conversion to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatusMessage({ type: 'error', text: 'Please select an image file (PNG, JPG, WebP).' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({ type: 'error', text: 'Image size should be less than 5MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result;
      setAvatarPreview(base64Data);

      // Auto-save the avatar to backend
      try {
        setSaving(true);
        const res = await fetch(apiUrl('/api/users/profile'), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
          body: JSON.stringify({ avatar: base64Data }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || 'Failed to update profile picture.');
        }

        updateUser(data.user);
        setStatusMessage({ type: 'success', text: 'Profile picture updated successfully!' });
      } catch (err) {
        setStatusMessage({ type: 'error', text: err.message });
      } finally {
        setSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    try {
      setSaving(true);
      const res = await fetch(apiUrl('/api/users/profile'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ avatar: '' }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to remove profile picture.');
      }

      setAvatarPreview('');
      updateUser(data.user);
      setStatusMessage({ type: 'success', text: 'Profile picture removed.' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const res = await fetch(apiUrl('/api/users/profile'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          phone: formData.phone,
          age: formData.age ? Number(formData.age) : undefined,
          country: formData.country,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save changes.');
      }

      updateUser(data.user);
      setIsEditing(false);
      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#203a8c]/20 border-t-[#203a8c] rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Cadet Flight Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 font-['Montserrat',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Status Alerts */}
        {statusMessage.text && (
          <div
            className={`p-5 rounded-2xl flex items-center justify-between shadow-sm transition-all ${
              statusMessage.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {statusMessage.type === 'error' ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
              ) : (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
              )}
              <span className="text-sm font-semibold">{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage({ type: '', text: '' })}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-black/5 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* HERO PROFILE HEADER */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/80 overflow-hidden relative">
          
          {/* Top Banner with Aviation Theme */}
          <div className="h-52 sm:h-64 bg-gradient-to-r from-[#07122a] via-[#12224d] to-[#1e3a8a] relative px-6 sm:px-12 flex items-start sm:items-center justify-between pt-6 sm:pt-0 overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Operations Label */}
            <div className="relative z-10 flex items-center gap-2.5 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-white/90 text-[11px] font-bold uppercase tracking-wider">
              <Plane className="w-3.5 h-3.5 text-cyan-400" />
              <span>Aerius Cadet Operations Deck</span>
            </div>
            
            {/* Quick Actions in Banner */}
            <div className="relative z-10 flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/90 hover:bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-red-900/30 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Profile Identity Bar */}
          <div className="px-6 sm:px-12 pb-10 pt-2 relative">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-24 sm:-mt-28 gap-8">
              
              {/* Avatar + Primary Identification */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
                
                {/* Avatar container */}
                <div className="relative group flex-shrink-0">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl ring-8 ring-white shadow-2xl bg-[#09142e] text-white flex items-center justify-center overflow-hidden border-2 border-slate-200">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-5xl font-black uppercase text-red-500 tracking-tight">
                          {user.name ? user.name.charAt(0) : 'A'}
                        </span>
                        <span className="text-[10px] tracking-widest uppercase text-slate-400 font-bold mt-1.5">
                          CADET
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Change Avatar Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    title="Change Cadet Photo"
                    className="absolute -bottom-2 -right-2 p-3 bg-[#203a8c] hover:bg-blue-900 text-white rounded-2xl shadow-lg ring-4 ring-white transition active:scale-95 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                  </button>

                  {/* Remove Avatar Button */}
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      title="Remove Photo"
                      className="absolute -top-2 -right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg ring-4 ring-white transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Cadet Info & Meta Badges */}
                <div className="text-center sm:text-left space-y-3">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {user.name}
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#203a8c] border border-blue-200/80 rounded-full text-xs font-black uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5 text-blue-700" />
                      {user.role === 'admin' ? 'Flight Operations Admin' : 'Pilot Cadet'}
                    </span>

                    {/* Official Verification Tag */}
                    {user.isVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Cadet</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider shadow-sm" title="Your account can login normally, and full verification is pending flight administrator authorization.">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pending Verification</span>
                      </span>
                    )}
                  </div>

                  <p className="text-slate-500 font-medium text-sm">
                    @{user.username || user.email.split('@')[0]} • Standard Pilot Flight Deck
                  </p>

                  {/* Info Pill Chips with Spacious Layout */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/70 transition rounded-xl text-xs font-semibold text-slate-700">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {user.email}
                    </span>

                    {user.phone && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {user.phone}
                      </span>
                    )}

                    {user.age && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {user.age} Years Old
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      {user.country || 'India'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 lg:mt-0">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white transition shadow-md shadow-red-900/20"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Cadet Admin Deck</span>
                  </Link>
                )}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-sm cursor-pointer ${
                    isEditing
                      ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      : 'bg-[#203a8c] text-white hover:bg-blue-900 shadow-blue-900/20'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Cancel Editing</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Cadet Profile</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* EDIT PROFILE DRAWER (EXPANDABLE) */}
        {isEditing && (
          <div className="bg-white rounded-[2rem] shadow-lg p-8 sm:p-10 border border-blue-200 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide flex items-center gap-2.5">
                  <Edit3 className="w-5 h-5 text-[#203a8c]" />
                  Cadet Records Modification
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Update your pilot credentials and contact information
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#203a8c] focus:bg-white transition"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Callsign / Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#203a8c] focus:bg-white transition"
                    placeholder="e.g. captain_shri"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#203a8c] focus:bg-white transition"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Cadet Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="14"
                    max="99"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#203a8c] focus:bg-white transition"
                    placeholder="e.g. 21"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Country of Training
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#203a8c] focus:bg-white transition"
                    placeholder="e.g. India"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Cadet Email (Permanent Login)
                  </label>
                  <input
                    type="text"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#203a8c] hover:bg-blue-900 text-white transition flex items-center gap-2 shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PRIMARY AVIATION TRAINING HUB */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-red-500" />
                <span>Aviation Flight Communications Hub</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Mandatory DGCA RTR Part 2 communication theory curriculum & real-time radio simulator
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* RTR 2 LEARN CARD */}
            <div className="bg-gradient-to-br from-[#08132d] via-[#12224d] to-[#1e3a8a] rounded-[2rem] p-8 sm:p-10 text-white shadow-lg flex flex-col justify-between border border-blue-900/40 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Radio className="w-7 h-7 text-red-400 animate-pulse" />
                  </div>
                  <span className="px-3.5 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-[10px] font-black tracking-widest uppercase">
                    PHRASEOLOGY CURRICULUM
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                    RTR 2 Learn Library
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-200/90 font-medium leading-relaxed">
                    Master official DGCA & ICAO Radio Telephony phraseology. Features interactive voice pronunciation in Indian English, hands-free voice command navigation, and worked exam conversations.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-blue-100 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>11 Categories covering all Viva transmission topics</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-blue-100 font-medium">
                    <Headphones className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Spoken Pilot & ATC transmissions in Indian English</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8">
                <Link
                  to="/rtr2"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-red-600 hover:bg-red-500 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition cursor-pointer"
                >
                  <span>Launch RTR 2 Learn</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* RTS 2 SIMULATOR CARD */}
            <div className="bg-gradient-to-br from-[#0b1329] via-[#1a233d] to-[#1e293b] rounded-[2rem] p-8 sm:p-10 text-white shadow-lg flex flex-col justify-between border border-slate-700/50 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Sliders className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="px-3.5 py-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-[10px] font-black tracking-widest uppercase">
                    COCKPIT SIMULATOR
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                    RTS 2 Flight Simulator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    Practice realistic DGCA exam question sets with live simulated AI Air Traffic Control voice responses. Push-to-talk transmission verification, carrier wave tuning, and automatic evaluation.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Real-time VHF carrier tuner & live radio console log</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-200 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Interactive Push-to-Talk (PTT) microphone evaluation</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8">
                <Link
                  to="/simulator"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition cursor-pointer"
                >
                  <span>Launch RTS 2 Simulator</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* CADET DOSSIER & FLIGHT RECORDS */}
        <div className="bg-white rounded-[2rem] shadow-sm p-8 sm:p-10 border border-slate-200/80 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#203a8c]" />
                Cadet Dossier & Verified Credentials
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Official operational profile and membership standing
              </p>
            </div>
            {user.isVerified ? (
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-full text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>● Official Verified Cadet</span>
              </span>
            ) : (
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-50 text-amber-700 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>○ Pending Admin Verification</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Registered Cadet Name</p>
              <p className="text-base font-bold text-slate-900">{user.name}</p>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Callsign / Handle</p>
              <p className="text-base font-bold text-slate-900 font-mono">
                @{user.username || user.email.split('@')[0]}
              </p>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Email (Login ID)</p>
              <p className="text-base font-bold text-slate-900 truncate" title={user.email}>
                {user.email}
              </p>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Contact Phone</p>
              <p className="text-base font-bold text-slate-900">
                {user.phone || 'Not provided'}
              </p>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cadet Age & Nationality</p>
              <p className="text-base font-bold text-slate-900">
                {user.age ? `${user.age} Years • ` : ''}{user.country || 'India'}
              </p>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cadet Verification Standing</p>
              <div className="flex items-center gap-1.5 pt-0.5">
                {user.isVerified ? (
                  <span className="text-sm font-black text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Verified Pilot Cadet
                  </span>
                ) : (
                  <span className="text-sm font-bold text-amber-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Pending Verification
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
