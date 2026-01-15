
import React, { useState } from 'react';
import { Mail, ArrowRight, Smartphone, Fingerprint } from 'lucide-react';

interface AuthViewProps {
  onLogin: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white flex flex-col p-8 animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl italic mb-8 shadow-xl shadow-indigo-100">K</div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 leading-tight">Bienvenue sur Kiéba.</h1>
        <p className="text-slate-500 mb-10 font-medium">Échangez votre contact d'un simple geste.</p>

        {step === 1 ? (
          <div className="space-y-4">
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold flex items-center justify-between group hover:bg-indigo-600 transition-all"
            >
              Continuer avec l'email <Mail size={20} />
            </button>
            <div className="flex gap-4">
              <button className="flex-1 bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition">
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale" alt="Google" />
              </button>
              <button className="flex-1 bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition">
                <Smartphone size={20} className="text-slate-400" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Votre Email</label>
              <input 
                autoFocus
                type="email" 
                placeholder="nom@entreprise.com"
                className="w-full bg-slate-50 border-none rounded-2xl p-5 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button 
              onClick={onLogin}
              className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-indigo-100"
            >
              Commencer <ArrowRight size={20} />
            </button>
            <button onClick={() => setStep(1)} className="w-full text-slate-400 text-sm font-bold">Retour</button>
          </div>
        )}
      </div>

      <div className="py-10 text-center flex flex-col items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-full text-slate-300">
          <Fingerprint size={24} />
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[200px]">
          Sécurisé par authentification biométrique et cryptage AES-256
        </p>
      </div>
    </div>
  );
};

export default AuthView;
