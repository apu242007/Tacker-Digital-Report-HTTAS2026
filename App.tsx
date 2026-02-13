import React, { useState } from 'react';
import { Home } from './Home';
import { ChecklistPOCOP001 } from './ChecklistPOCOP001';
import { Checklist0178 } from './Checklist0178';
import { Checklist5500 } from './Checklist5500';
import { Checklist7000 } from './Checklist7000';
import { Checklist9580 } from './Checklist9580';
import { ChecklistSCRH1605 } from './ChecklistSCRH1605';
import { ChecklistSCRH5500 } from './ChecklistSCRH5500';
import { ChecklistSNT1641 } from './ChecklistSNT1641';
import { ChecklistSNT2_1667 } from './ChecklistSNT2_1667';
import { ChecklistKitWireLine } from './ChecklistKitWireLine';
import { ChecklistStingerCementar } from './ChecklistStingerCementar';
import { ChecklistTPR1_0201 } from './ChecklistTPR1_0201';
import { ChecklistPescadorTCR2 } from './ChecklistPescadorTCR2';
import { ChecklistPescadorTCR2_5500 } from './ChecklistPescadorTCR2_5500';
import { ChecklistPescadorTCR2_9580 } from './ChecklistPescadorTCR2_9580';
import { ChecklistRetenedor1505 } from './ChecklistRetenedor1505';
import { ChecklistRetenedor1505_5500 } from './ChecklistRetenedor1505_5500';
import { ChecklistRetenedor1540_5500 } from './ChecklistRetenedor1540_5500';
import { ChecklistRetenedor1540_5500_2 } from './ChecklistRetenedor1540_5500_2';

type ViewState = 'home' | 'checklist-001' | 'checklist-0178' | 'checklist-5500' | 'checklist-7000' | 'checklist-9580' | 'checklist-scrh1605' | 'checklist-scrh5500' | 'checklist-snt1641' | 'checklist-snt2-1667' | 'checklist-kitwireline' | 'checklist-stinger' | 'checklist-tpr1' | 'checklist-pescador-tcr2' | 'checklist-pescador-tcr2-5500' | 'checklist-pescador-tcr2-9580' | 'checklist-retenedor-cemento' | 'checklist-retenedor-cemento-5500' | 'checklist-retenedor-1540-5500' | 'checklist-retenedor-1540-5500-2';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const navigateTo = (view: string) => {
    // Simple routing logic, easily extensible
    if (view === 'home' || view === 'checklist-001' || view === 'checklist-0178' || view === 'checklist-5500' || view === 'checklist-7000' || view === 'checklist-9580' || view === 'checklist-scrh1605' || view === 'checklist-scrh5500' || view === 'checklist-snt1641' || view === 'checklist-snt2-1667' || view === 'checklist-kitwireline' || view === 'checklist-stinger' || view === 'checklist-tpr1' || view === 'checklist-pescador-tcr2' || view === 'checklist-pescador-tcr2-5500' || view === 'checklist-pescador-tcr2-9580' || view === 'checklist-retenedor-cemento' || view === 'checklist-retenedor-cemento-5500' || view === 'checklist-retenedor-1540-5500' || view === 'checklist-retenedor-1540-5500-2') {
        setCurrentView(view as ViewState);
        window.scrollTo(0, 0);
    }
  };

  switch (currentView) {
    case 'checklist-001':
      return <ChecklistPOCOP001 onBack={() => navigateTo('home')} />;
    case 'checklist-0178':
      return <Checklist0178 onBack={() => navigateTo('home')} />;
    case 'checklist-5500':
      return <Checklist5500 onBack={() => navigateTo('home')} />;
    case 'checklist-7000':
      return <Checklist7000 onBack={() => navigateTo('home')} />;
    case 'checklist-9580':
      return <Checklist9580 onBack={() => navigateTo('home')} />;
    case 'checklist-scrh1605':
      return <ChecklistSCRH1605 onBack={() => navigateTo('home')} />;
    case 'checklist-scrh5500':
      return <ChecklistSCRH5500 onBack={() => navigateTo('home')} />;
    case 'checklist-snt1641':
      return <ChecklistSNT1641 onBack={() => navigateTo('home')} />;
    case 'checklist-snt2-1667':
      return <ChecklistSNT2_1667 onBack={() => navigateTo('home')} />;
    case 'checklist-kitwireline':
      return <ChecklistKitWireLine onBack={() => navigateTo('home')} />;
    case 'checklist-stinger':
      return <ChecklistStingerCementar onBack={() => navigateTo('home')} />;
    case 'checklist-tpr1':
      return <ChecklistTPR1_0201 onBack={() => navigateTo('home')} />;
    case 'checklist-pescador-tcr2':
      return <ChecklistPescadorTCR2 onBack={() => navigateTo('home')} />;
    case 'checklist-pescador-tcr2-5500':
      return <ChecklistPescadorTCR2_5500 onBack={() => navigateTo('home')} />;
    case 'checklist-pescador-tcr2-9580':
      return <ChecklistPescadorTCR2_9580 onBack={() => navigateTo('home')} />;
    case 'checklist-retenedor-cemento':
      return <ChecklistRetenedor1505 onBack={() => navigateTo('home')} />;
    case 'checklist-retenedor-cemento-5500':
      return <ChecklistRetenedor1505_5500 onBack={() => navigateTo('home')} />;
    case 'checklist-retenedor-1540-5500':
      return <ChecklistRetenedor1540_5500 onBack={() => navigateTo('home')} />;
    case 'checklist-retenedor-1540-5500-2':
      return <ChecklistRetenedor1540_5500_2 onBack={() => navigateTo('home')} />;
    case 'home':
    default:
      return <Home onNavigate={navigateTo} />;
  }
} 
