
import React, { useState, useEffect } from 'react';
import { UserProfile, DiscoveredDevice } from '../types';
import { Smartphone, QrCode, Wifi, Loader2, Sparkles, CheckCircle2, UserPlus, SignalHigh, SignalLow, SignalMedium, X } from 'lucide-react';

interface ShareViewProps {
  profile: UserProfile;
  onEncountered: (contact: UserProfile) => void;
}

const ShareView: React.FC<ShareViewProps> = ({ profile, onEncountered }) => {
  const [sharingMethod, setSharingMethod] = useState<'NFC' | 'QR' | 'BLE'>('BLE');
  const [isScanning, setIsScanning] = useState(false);
  const [discovered, setDiscovered] = useState<DiscoveredDevice[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  useEffect(() => {
    if (sharingMethod === 'BLE' && isScanning) {
      const timer1 = setTimeout(() => {
        setDiscovered(prev => [...prev, {
          id: 'dev_1',
          name: 'iPhone de Sarah',
          rssi: -45,
          profile: {
            id: 'user_sarah',
            firstName: 'Sarah',
            lastName: 'Bernard',
            title: 'Lead Architect',
            company: 'EcoStruct',
            email: 'sarah.b@ecostruct.io',
            phone: '+33 6 12 34 56 78',
            avatar: '',
            bio: 'Spécialiste en construction durable.',
            socials: { linkedin: 'sarahb' },
            tags: ['Architecture', 'BIM', 'Sustainable']
          }
        }]);
      }, 1500);

      const timer2 = setTimeout(() => {
        setDiscovered(prev => [...prev, {
          id: 'dev_2',
          name: 'Android de Julien',
          rssi: -72,
          profile: {
            id: 'user_julien',
            firstName: 'Julien',
            lastName: 'Masson',
            title: 'Directeur Commercial',
            company: 'TechLogic',
            email: 'j.masson@techlogic.fr',
            phone: '+33 6 99 88 77 66',
            avatar: '',
            bio: 'Expert en solutions B2B SaaS.',
            socials: {},
            tags: ['Vente', 'SaaS', 'Management']
          }
        }]);
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [sharingMethod, isScanning]);

  const toggleScan = () => {
    if (isScanning) {
      setIsScanning(false);
      setDiscovered([]);
    } else {
      setIsScanning(true);
      setDiscovered([]);
    }
  };

  const handleConnect = (device: DiscoveredDevice) => {
    setSelectedDevice(device.id);
    // Simulate connection delay
    setTimeout(() => {
      if (device.profile) {
        onEncountered(device.profile);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
      setSelectedDevice(null);
      setIsScanning(false);
      setDiscovered([]);
    }, 1500);
  };

  const getSignalIcon = (rssi: number) => {
    if (rssi > -50) return <SignalHigh size={14} className="text-emerald-500" />;
    if (rssi > -75) return <SignalMedium size={14} className="text-amber-500" />;
    return <SignalLow size={14} className="text-red-500" />;
  };

  return (
    <div className="p-6 h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-8 z-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Partager</h1>
        <div className="flex gap-2">
          {isScanning && (
            <button onClick={toggleScan} className="p-2 bg-slate-100 rounded-full text-slate-400">
               <X size={20} />
            </button>
          )}
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            {sharingMethod === 'BLE' ? <Wifi size={20} /> : sharingMethod === 'QR' ? <QrCode size={20} /> : <Smartphone size={20} />}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {sharingMethod === 'BLE' && (
          <div className="w-full flex flex-col items-center">
            {/* Radar Simulation */}
            <div className="relative w-full aspect-square max-w-[320px] mb-12 flex items-center justify-center">
              {/* Animated concentric circles */}
              <div className={`absolute w-full h-full border border-slate-100 rounded-full ${isScanning ? 'animate-pulse scale-100 opacity-30' : 'opacity-0'}`}></div>
              <div className={`absolute w-3/4 h-3/4 border border-slate-100 rounded-full ${isScanning ? 'animate-pulse scale-100 opacity-50' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}></div>
              <div className={`absolute w-1/2 h-1/2 border border-slate-100 rounded-full ${isScanning ? 'animate-pulse scale-100 opacity-70' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}></div>
              
              {/* Center Device */}
              <div className="relative z-20 w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center border-2 border-indigo-600">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-inner">K</div>
                <span className="mt-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">Moi</span>
              </div>

              {/* Floating Discovered Devices */}
              {isScanning && discovered.map((device, idx) => (
                <button
                  key={device.id}
                  onClick={() => handleConnect(device)}
                  disabled={selectedDevice !== null}
                  className={`absolute z-30 transition-all duration-700 animate-in zoom-in slide-in-from-bottom-10 ${
                    selectedDevice === device.id ? 'scale-125 z-50' : 'hover:scale-110'
                  }`}
                  style={{
                    top: idx === 0 ? '15%' : '75%',
                    right: idx === 0 ? '10%' : 'auto',
                    left: idx === 1 ? '10%' : 'auto',
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-3xl shadow-xl flex items-center justify-center border-2 bg-white ${
                      selectedDevice === device.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'
                    }`}>
                      {selectedDevice === device.id ? (
                        <Loader2 size={24} className="text-indigo-600 animate-spin" />
                      ) : (
                        <span className="font-black text-slate-500 text-lg">
                          {device.profile?.firstName[0]}{device.profile?.lastName[0]}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-slate-100 flex items-center gap-2">
                      {getSignalIcon(device.rssi)}
                      <span className="text-[10px] font-black text-slate-700 truncate max-w-[80px] uppercase tracking-wider">
                        {device.name.split(' ')[2]}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center max-w-[280px]">
              <h2 className="text-xl font-black text-slate-900 mb-2">
                {isScanning ? 'Recherche Bluetooth...' : 'Scanner à proximité'}
              </h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {isScanning 
                  ? 'Détection des appareils Kiéba ouverts à moins de 10 mètres.' 
                  : 'Appuyez pour découvrir les contacts autour de vous.'}
              </p>
            </div>
            
            {!isScanning && (
              <button 
                onClick={toggleScan}
                className="mt-8 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 flex items-center gap-3 active:scale-95 transition-all"
              >
                Lancer le scan <Sparkles size={20} />
              </button>
            )}
          </div>
        )}

        {sharingMethod === 'QR' && (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="bg-white p-6 rounded-[3rem] shadow-2xl border-4 border-slate-50 mb-10 group cursor-pointer transition-transform hover:scale-105">
               <div className="w-64 h-64 bg-slate-900 rounded-2xl flex flex-wrap p-4 overflow-hidden relative">
                  {/* Visual abstraction of a QR code */}
                  <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 opacity-20">
                     {Array.from({length: 100}).map((_, i) => (
                        <div key={i} className={`bg-white rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                     ))}
                  </div>
                  <div className="w-16 h-16 border-4 border-white rounded-lg m-1"></div>
                  <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-4 border-white rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                        <div className="text-indigo-600 font-black text-2xl italic">K</div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="text-center">
               <h2 className="text-xl font-black text-slate-900 mb-2">Votre QR Code</h2>
               <p className="text-slate-500 text-sm font-medium max-w-[240px]">
                 Faites scanner ce code pour partager votre contact instantanément.
               </p>
            </div>
            <button className="mt-8 flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-6 py-3 rounded-xl">
               Partager le lien direct
            </button>
          </div>
        )}

        {sharingMethod === 'NFC' && (
          <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom-10 duration-500">
             <div className="relative w-full max-w-[280px] h-64 flex items-center justify-center mb-10">
                <div className="absolute top-0 w-32 h-56 bg-slate-900 rounded-[2.5rem] border-4 border-slate-800 shadow-xl overflow-hidden animate-bounce">
                   <div className="h-4 w-12 bg-slate-800 mx-auto mt-2 rounded-full"></div>
                </div>
                <div className="absolute -top-10 w-48 h-48 bg-indigo-500/10 rounded-full animate-ping"></div>
                <Smartphone size={100} className="text-indigo-600 relative z-10 opacity-20" />
             </div>
             <div className="text-center">
                <h2 className="text-xl font-black text-slate-900 mb-2">Prêt pour NFC</h2>
                <p className="text-slate-500 text-sm font-medium max-w-[260px]">
                  Approchez le haut de votre téléphone d'un autre appareil compatible Kiéba.
                </p>
             </div>
             <div className="mt-10 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500"><SignalHigh size={20} /></div>
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  Assurez-vous que le NFC est activé dans vos réglages.
                </p>
             </div>
          </div>
        )}
      </div>

      {/* Bottom Method Selector */}
      <div className="bg-slate-100 p-1.5 rounded-[2rem] flex gap-1 mt-auto relative z-10 shadow-inner">
        {(['BLE', 'QR', 'NFC'] as const).map((method) => (
          <button
            key={method}
            onClick={() => {
              setSharingMethod(method);
              setIsScanning(false);
              setDiscovered([]);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              sharingMethod === method 
                ? 'bg-white text-indigo-600 shadow-md transform scale-[1.02]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {method === 'BLE' && <Wifi size={16} strokeWidth={3} />}
            {method === 'QR' && <QrCode size={16} strokeWidth={3} />}
            {method === 'NFC' && <Smartphone size={16} strokeWidth={3} />}
            {method}
          </button>
        ))}
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-4 z-[100] animate-in slide-in-from-top-20 bounce-in">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="font-black text-lg leading-none">Contact Ajouté !</div>
            <div className="text-emerald-100 text-xs font-bold uppercase tracking-widest mt-1">Synchronisé au cloud</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareView;
