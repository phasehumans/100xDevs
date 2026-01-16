import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TeamGrid } from './components/TeamGrid';
import { Footer } from './components/Footer';
import { BuilderLayout } from './components/BuilderLayout';
import { AuthModal } from './components/AuthModal';
import { LoadingOverlay } from './components/LoadingOverlay';
import { WorkforceSection } from './components/WorkforceSection';
import { CreationsGrid, CreationItem } from './components/CreationsGrid';

// Mock Data
const MY_CREATIONS: CreationItem[] = [
  {
    title: "Crypto Dashboard",
    description: "Real-time tracking of 50+ assets.",
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    ctaText: "View Project",
    ctaLink: "#",
    content: () => (
      <p>A comprehensive dashboard for tracking cryptocurrency portfolios. Built with React and Tailwind, featuring real-time WebSocket updates for price data and interactive charts using Recharts.</p>
    ),
  },
  {
    title: "SaaS Landing Page",
    description: "High-conversion page for AI startup.",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    ctaText: "View Project",
    ctaLink: "#",
    content: () => (
      <p>Modern landing page designed for a SaaS product. Includes features section, pricing tables, and testimonial carousel. Optimized for SEO and performance with a perfect Lighthouse score.</p>
    ),
  },
];

const COMMUNITY_CREATIONS: CreationItem[] = [
  {
    title: "E-commerce Store",
    description: "Minimalist fashion store with cart.",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
    ctaText: "View Project",
    ctaLink: "#",
    content: () => <p>A clean, minimalist e-commerce template suitable for fashion brands. Features a product grid, dynamic cart drawer, and seamless checkout flow integrated with Stripe.</p>,
  },
  {
    title: "Portfolio V1",
    description: "Dark mode developer portfolio.",
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2655&auto=format&fit=crop",
    ctaText: "View Project",
    ctaLink: "#",
    content: () => <p>A sleek dark-mode portfolio for developers. Showcases projects with expandable cards, a skills section with progress bars, and a contact form connected to EmailJS.</p>,
  },
  {
    title: "Task Manager",
    description: "Kanban board for team productivity.",
    src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2672&auto=format&fit=crop",
    ctaText: "View Project",
    ctaLink: "#",
    content: () => <p>A Trello-like Kanban board application. Users can create columns, drag and drop tasks, add tags, and assign due dates. LocalStorage persistence included.</p>,
  },
  {
    title: "Social Feed",
    description: "Instagram-like photo feed app.",
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
    ctaText: "View Project",
    ctaLink: "#",
    content: () => <p>A responsive social media feed with infinite scroll. Supports image uploads, likes, comments, and user profiles. Built with a focus on mobile-first design.</p>,
  },
  {
    title: "Blog Platform",
    description: "Markdown-based blogging engine.",
    src: "https://images.unsplash.com/photo-1499750310159-5b600aaf0320?q=80&w=2669&auto=format&fit=crop",
    ctaText: "View Project",
    ctaLink: "#",
    content: () => <p>A lightweight blogging platform that parses Markdown files. Features syntax highlighting for code blocks, reading time estimation, and a clean typography system.</p>,
  },
  {
    title: "Weather App",
    description: "Beautiful weather visualizations.",
    src: "https://images.unsplash.com/photo-1592210454132-3935ac7fd2da?q=80&w=2525&auto=format&fit=crop",
    ctaText: "View Project",
    ctaLink: "#",
    content: () => <p>Visualizes weather data using dynamic backgrounds that change based on conditions. Provides 7-day forecasts, humidity levels, and wind speed using the OpenWeather API.</p>,
  },
];

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'builder'>('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startBuildingFlow = () => {
    setIsAuthModalOpen(false);
    setIsLoading(true);
    
    // Simulate generation time (8 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setCurrentView('builder');
    }, 8000);
  };

  const handleGenerate = (prompt: string) => {
    setInitialPrompt(prompt);
    if (isLoggedIn) {
      startBuildingFlow();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuth = () => {
    setIsLoggedIn(true);
    if (initialPrompt) {
      startBuildingFlow();
    } else {
      setIsAuthModalOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
  };

  const handleLogoClick = () => {
    setCurrentView('landing');
    setInitialPrompt('');
    setIsLoading(false);
  };

  if (currentView === 'builder') {
    return (
      <BuilderLayout 
        initialPrompt={initialPrompt} 
        onBack={() => setCurrentView('landing')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsAuthModalOpen(true)} 
        onLogoClick={handleLogoClick}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        <Hero onGenerate={handleGenerate} />
        
        {isLoggedIn ? (
          // Logged In View
          <>
            <div className="border-t border-white/5">
              <CreationsGrid 
                title="My Creations" 
                subtitle="Your recent autonomous projects."
                items={MY_CREATIONS} 
              />
            </div>
            <div className="border-t border-white/5">
              <CreationsGrid 
                title="Community" 
                subtitle="Top rated generations from the network."
                items={COMMUNITY_CREATIONS} 
              />
            </div>
          </>
        ) : (
          // Logged Out View (Marketing)
          <>
            <WorkforceSection />
            <div id="features">
              <TeamGrid />
            </div>
          </>
        )}
      </main>

      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />

      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}

export default App;