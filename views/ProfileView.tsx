
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Edit3, Linkedin, Twitter, Instagram, Globe, Phone, Mail, Building2, Save, X, Camera } from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Modifier</h1>
          <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400"><X /></button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-slate-400">
                {editForm.firstName[0]}{editForm.lastName[0]}
              </div>
              <button className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg">
                <Camera size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Prénom</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" 
                value={editForm.firstName} 
                onChange={e => setEditForm({...editForm, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Nom</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" 
                value={editForm.lastName} 
                onChange={e => setEditForm({...editForm, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Poste</label>
            <input 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" 
              value={editForm.title} 
              onChange={e => setEditForm({...editForm, title: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Entreprise</label>
            <input 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold" 
              value={editForm.company} 
              onChange={e => setEditForm({...editForm, company: e.target.value})}
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 mt-8 shadow-xl"
          >
            <Save size={20} /> Enregistrer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mon Profil</h1>
        <button 
          onClick={() => setIsEditing(true)}
          className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition"
        >
          <Edit3 size={20} />
        </button>
      </div>

      <div className="relative group mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-30 transition-all"></div>
        <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="flex items-start justify-between mb-8">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black border border-white/30">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <div className="text-right">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-black italic">K</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-black leading-none mb-1">{profile.firstName} {profile.lastName}</h2>
            <p className="text-indigo-100 font-medium opacity-90">{profile.title}</p>
            <p className="text-indigo-200 text-sm mt-1 flex items-center gap-1"><Building2 size={14} /> {profile.company}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Contact direct</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm"><Phone size={18} /></div>
              <div>
                <div className="text-xs text-slate-400 font-bold">Téléphone</div>
                <div className="text-slate-900 font-semibold">{profile.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm"><Mail size={18} /></div>
              <div>
                <div className="text-xs text-slate-400 font-bold">Email</div>
                <div className="text-slate-900 font-semibold">{profile.email}</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Réseaux Sociaux</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Linkedin size={18} className="text-[#0077b5]" />
              <span className="text-sm font-bold text-slate-700">LinkedIn</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Twitter size={18} className="text-[#1DA1F2]" />
              <span className="text-sm font-bold text-slate-700">Twitter</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileView;
