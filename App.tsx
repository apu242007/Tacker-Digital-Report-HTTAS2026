import React, { useState } from 'react';
import { Home } from './Home';
import { ChecklistPOCOP001 } from './ChecklistPOCOP001';
import { Checklist0178 } from './Checklist0178';

type ViewState = 'home' | 'checklist-001' | 'checklist-0178';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const navigateTo = (view: string) => {
    // Simple routing logic, easily extensible
    if (view === 'home' || view === 'checklist-001' || view === 'checklist-0178') {
        setCurrentView(view as ViewState);
        window.scrollTo(0, 0);
    }
  };

  switch (currentView) {
    case 'checklist-001':
      return <ChecklistPOCOP001 onBack={() => navigateTo('home')} />;
    case 'checklist-0178':
      return <Checklist0178 onBack={() => navigateTo('home')} />;
    case 'home':
    default:
      return <Home onNavigate={navigateTo} />;
  }
}