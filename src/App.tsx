import React from 'react';
import { usePortfolio, PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './components/common/ThemeProvider';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { AboutSection } from './components/public/AboutSection';
import { ProjectsBento } from './components/public/ProjectsBento';
import { ProcessSection } from './components/public/ProcessSection';
import { TechStackSection } from './components/public/TechStackSection';
import { ExperienceSection } from './components/public/ExperienceSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { ProjectDetailModal } from './components/public/ProjectDetailModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { activeView } = usePortfolio();

  if (activeView === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-[#070a11] text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-200">
        <AdminDashboard />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-[#0a0d14] text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-200 relative">
      <Navbar />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <AboutSection />
        <ProjectsBento />
        <ProcessSection />
        <TechStackSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Modals & Portals */}
      <ProjectDetailModal />
      <AdminLoginModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <MainLayout />
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
