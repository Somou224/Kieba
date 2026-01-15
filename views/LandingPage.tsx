
import React from 'react';
import { Smartphone, Zap, Shield, Users, ArrowRight, Share2, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl italic">K</div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">Kiéba</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition">Fonctionnalités</a>
          <a href="#pricing" className="hover:text-indigo-600 transition">Tarifs</a>
          <a href="#ai" className="hover:text-indigo-600 transition">IA</a>
        </div>
        <button 
          onClick={onLaunch}
          className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-600 transition-all flex items-center gap-2"
        >
          Lancer la démo <ArrowRight size={18} />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-32 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-8">
          <Zap size={16} /> Nouveau : Analyse de profil par IA disponible
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
          Un geste. Un contact.<br /><span className="text-indigo-600">Instantanément.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Dites adieu aux cartes de visite papier et à la dictée de numéros. Échangez vos profils professionnels par simple proximité.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={onLaunch}
            className="w-full md:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-200"
          >
            Télécharger Kiéba
          </button>
          <button className="w-full md:w-auto bg-slate-100 text-slate-900 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-slate-200 transition">
            Voir la vidéo
          </button>
        </div>

        {/* Mockup Simulation */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
          <img 
            src="https://picsum.photos/seed/kieba/1200/600" 
            alt="Kiéba Interface" 
            className="rounded-3xl shadow-2xl mx-auto border border-slate-100"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">La technologie au service du réseau</h2>
          <p className="text-slate-600 text-lg">Trois méthodes, une seule fluidité.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            { icon: Share2, title: "NFC Magic", desc: "Approchez simplement votre téléphone. Le contact s'ajoute automatiquement." },
            { icon: Users, title: "BLE Scan", desc: "Partagez votre carte à toutes les personnes présentes dans la pièce en un scan." },
            { icon: Smartphone, title: "QR Dynamique", desc: "Un fallback universel et élégant pour tous les appareils, même sans l'app." }
          ].map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
            <SparklesIcon />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            Votre assistant réseau personnel<br /><span className="text-purple-600">Propulsé par Gemini AI.</span>
          </h2>
          <ul className="space-y-4">
            {[
              "Catégorisation automatique des rencontres",
              "Détection d'opportunités business",
              "Suggestions de relances personnalisées",
              "Tags intelligents basés sur l'expertise"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 size={20} className="text-emerald-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 p-12 rounded-[3rem] text-white">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-full"></div>
              <div>
                <div className="font-bold">Jean Dupont</div>
                <div className="text-xs opacity-70">Directeur Innovation @ TechCorp</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 bg-white/20 rounded-full w-full"></div>
              <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider mb-2 text-white/60">Insight IA</div>
              <p className="text-sm italic text-indigo-100">"Opportunité : Partenariat potentiel sur le projet SmartCity. Relance conseillée sous 48h."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl italic">K</div>
              <span className="text-2xl font-black tracking-tight">Kiéba</span>
            </div>
            <p className="text-slate-400 max-w-sm">Le réseau professionnel nouvelle génération. Connectez-vous sans friction.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold mb-4">App</h4>
              <ul className="text-slate-400 space-y-2">
                <li>Fonctionnalités</li>
                <li>Sécurité</li>
                <li>Intégrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Société</h4>
              <ul className="text-slate-400 space-y-2">
                <li>À propos</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-20 pt-10 text-slate-500 text-sm">
          © 2024 Kiéba. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

export default LandingPage;
