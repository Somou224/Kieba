
import React, { useState, useEffect } from 'react';
import { AppTab, UserProfile, Encounter } from '../types';
import Navigation from '../components/Navigation';
import ProfileView from './ProfileView';
import ShareView from './ShareView';
import HistoryView from './HistoryView';
import AIView from './AIView';
import { initialProfile, mockEncounters } from '../constants';

const AppView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.PROFILE);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [encounters, setEncounters] = useState<Encounter[]>(mockEncounters);

  const addEncounter = (newContact: UserProfile) => {
    const newEncounter: Encounter = {
      id: Math.random().toString(36).substr(2, 9),
      contact: newContact,
      date: new Date().toISOString(),
      location: "Paris, FR"
    };
    setEncounters([newEncounter, ...encounters]);
    setActiveTab(AppTab.HISTORY);
  };

  return (
    <div className="app-container flex flex-col">
      {/* Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === AppTab.PROFILE && <ProfileView profile={userProfile} setProfile={setUserProfile} />}
        {activeTab === AppTab.SHARE && <ShareView profile={userProfile} onEncountered={addEncounter} />}
        {activeTab === AppTab.HISTORY && <HistoryView encounters={encounters} />}
        {activeTab === AppTab.AI && <AIView encounters={encounters} />}
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default AppView;
