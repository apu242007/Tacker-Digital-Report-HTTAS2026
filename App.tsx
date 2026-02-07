import React, { useState } from 'react';
import { Home } from './Home';
import { ChecklistPOCOP001 } from './ChecklistPOCOP001';
import { Checklist0178 } from './Checklist0178';
import { Checklist5500 } from './Checklist5500';
import { Checklist7000 } from './Checklist7000';
import { Checklist9580 } from './Checklist9580';

type ViewState = 'home' | 'checklist-001' | 'checklist-0178' | 'checklist-5500' | 'checklist-7000' | 'checklist-9580';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const navigateTo = (view: string) => {
    // Simple routing logic, easily extensible
    if (view === 'home' || view === 'checklist-001' || view === 'checklist-0178' || view === 'checklist-5500' || view === 'checklist-7000' || view === 'checklist-9580') {
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
    case 'home':
    default:
      return <Home onNavigate={navigateTo} />;
  }
}