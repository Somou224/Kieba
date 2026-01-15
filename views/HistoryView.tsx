
import React, { useState } from 'react';
import { Encounter } from '../types';
import { Search, MapPin, Calendar, MoreHorizontal, ChevronRight } from 'lucide-react';

interface HistoryViewProps {
  encounters: Encounter[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ encounters }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = encounters.filter(e => 
    `${e.contact.firstName} ${e.contact.lastName} ${e.contact.company}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-6">Mes Rencontres</h1>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          placeholder="Rechercher un contact..."
          className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((encounter) => (
          <div key={encounter.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition group">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-500 border border-slate-100">
                    {encounter.contact.firstName[0]}{encounter.contact.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                        {encounter.contact.firstName} {encounter.contact.lastName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{encounter.contact.title} @ {encounter.contact.company}</p>
                  </div>
               </div>
               <button className="p-2 text-slate-400">
                  <ChevronRight size={20} />
               </button>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-indigo-500" />
                    {new Date(encounter.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </div>
                {encounter.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-indigo-500" />
                    {encounter.location}
                  </div>
                )}
            </div>

            {/* AI Chip if exists */}
            {encounter.aiInsights && (
               <div className="mt-4 pt-4 border-t border-slate-50">
                  <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                     <SparklesIcon size={12} /> {encounter.aiInsights.category}
                  </div>
               </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium italic">Aucun contact trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SparklesIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);

export default HistoryView;
