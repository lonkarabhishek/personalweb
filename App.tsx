import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './pages/HomePage';
import { ResumePage } from './pages/ResumePage';
import { BarkitPage } from './pages/BarkitPage';
import { StudioPage } from './pages/StudioPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

// Detect if we're on the studio subdomain
const isStudioSubdomain = window.location.hostname === 'studio.workwithabhi.online';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Separated content component to use useLocation inside HashRouter context
const AppContent: React.FC = () => {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/resume' || location.pathname === '/barkit' || location.pathname === '/studio';

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 gradient-bg">
      <ScrollToTop />
      {!isStandalonePage && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/barkit" element={<BarkitPage />} />
            <Route path="/studio" element={<StudioPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isStandalonePage && <Footer />}
    </div>
  );
};

// Studio-only app for the subdomain — renders StudioPage directly
const StudioApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <div className="min-h-screen flex flex-col font-sans">
          <StudioPage />
        </div>
      )}
    </>
  );
};

// Main site app with HashRouter
const MainApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <HashRouter>
          <AppContent />
        </HashRouter>
      )}
    </>
  );
};

// Route to the right app based on subdomain
const App: React.FC = () => {
  return isStudioSubdomain ? <StudioApp /> : <MainApp />;
};

export default App;
