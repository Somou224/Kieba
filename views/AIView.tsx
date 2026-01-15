
import React, { useState, useEffect } from 'react';
import { Encounter } from '../types';
import { analyzeContact } from '../services/geminiService';
import { Sparkles, BrainCircuit, Lightbulb, MessageSquare, Loader2 } from 'lucide-react';

interface AIViewProps {
  encounters: Encounter[];
}

const AIView: React.FC<AIViewProps> = ({ encounters }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [insights, setInsights] = useState<any[]>([]);

  const startAnalysis = async () => {
    setAnalyzing(true);
    const newInsights = [];
    // Just analyze the first few for demo
    for (const encounter of encounters.slice(0, 3)) {
      const res = await analyzeContact(encounter.contact);
      if (res) newInsights.push({ id: encounter.id, ...res, contact: encounter.contact });
    }
    setInsights(newInsights);
    setAnalyzing(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
           <Sparkles size={20} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kiéba IA</h1>
      </div>
      <p className="text-slate-500 text-sm mb-8 font-medium italic">Gemini analyse votre réseau pour créer des opportunités.</p>

      {insights.length === 0 && !analyzing && (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-10 text-white text-center shadow-xl mb-8">
           <BrainCircuit size={64} className="mx-auto mb-6 opacity-50" />
           <h2 className="text-2xl font-black mb-4">Prêt à booster votre réseau ?</h2>
           <p className="text-indigo-100 mb-8 leading-relaxed opacity-90 text-sm">Notre IA analyse vos contacts pour identifier les opportunités business et les points de synergie.</p>
           <button 
             onClick={startAnalysis}
             className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black hover:bg-indigo-50 transition shadow-lg"
           >
             Analyser mes rencontres
           </button>
        </div>
      )}

      {analyzing && (
        <div className="text-center py-20">
           <Loader2 size={48} className="mx-auto text-indigo-600 animate-spin mb-4" />
           <p className="text-slate-500 font-bold">L'intelligence artificielle étudie vos profils...</p>
        </div>
      )}

      <div className="space-y-6">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                  {insight.contact.firstName[0]}{insight.contact.lastName[0]}
               </div>
               <div>
                  <div className="font-black text-slate-900">{insight.contact.firstName} {insight.contact.lastName}</div>
                  <div className="text-[10px] font-black uppercase text-indigo-600 tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full inline-block">
                    {insight.category}
                  </div>
               </div>
            </div>

            <div className="space-y-4">
                <div className="flex gap-4">
                   <div className="mt-1"><Lightbulb className="text-amber-500" size={18} /></div>
                   <div>
                      <div className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Opportunité</div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{insight.opportunity}</p>
                   </div>
                </div>

                <div className="flex gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="mt-1"><MessageSquare className="text-indigo-500" size={18} /></div>
                   <div>
                      <div className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Conseil relance</div>
                      <p className="text-sm text-slate-700 italic font-medium leading-relaxed">"{insight.followUpPrompt}"</p>
                      <button className="mt-3 text-indigo-600 text-xs font-bold hover:underline flex items-center gap-1">
                        Copier le message
                      </button>
                   </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIView;
