import React from "react";
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { UserMenu } from "@/components/UserMenu";
import { Button } from "./components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./components/ui/popover";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ChevronUp, ChevronRight, MessageCircle, Twitter, Mail } from "lucide-react";
import { PricingPage } from "@/pages/PricingPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { StartupPage } from "@/pages/StartupPage";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { PlaygroundPage } from "@/pages/PlaygroundPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { DocsPage } from "@/pages/DocsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  console.log('ProtectedRoute - isLoggedIn:', isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
}

function Footer({ isLoggedIn, logout, navigate }: { isLoggedIn: boolean; logout: () => void; navigate: (path: string) => void }) {
  const location = useLocation();
  const [isGetStartedPopoverOpen, setIsGetStartedPopoverOpen] = React.useState(false);
  const [isSocialPopoverOpen, setIsSocialPopoverOpen] = React.useState(false);
  const [isSocialHovered, setIsSocialHovered] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer className="w-full bg-background h-24 relative sticky bottom-0 flex-shrink-0">
      <div className="container mx-auto px-4 py-4 pb-12">
        {/* Left */}
        <div
          className="absolute left-8 top-1/2 transform -translate-y-1/2 flex items-center gap-2"
          onMouseEnter={() => setIsSocialHovered(true)}
          onMouseLeave={() => setIsSocialHovered(false)}
        >
          {isLoggedIn ? (
            <Link to="/dashboard" className="text-lg font-bold gradient-text">
              crofAI
            </Link>
          ) : (
            <Link to="/" className="text-lg font-bold gradient-text">
              crofAI
            </Link>
          )}
          <div className="flex items-center ml-2">
            <button
              onClick={() => setIsSocialPopoverOpen(!isSocialPopoverOpen)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className={`h-5 w-5 transition-transform ${(isSocialPopoverOpen || isSocialHovered) ? 'scale-x-[-1]' : ''}`} />
            </button>
            <div className={`flex items-center gap-4 ml-4 transition-all duration-300 ease-in-out ${isSocialPopoverOpen || isSocialHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`}>
              <a href="https://discord.gg/e8UeP7YdJW" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-purple-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="https://x.com/nahcrof" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-purple-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:nahcrof@gmail.com" className="text-muted-foreground hover:text-purple-500 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Center - Hidden on mobile */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-6">
          <Link to="/pricing" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-18 text-center ${location.pathname === '/pricing' ? 'font-bold text-white' : ''}`}>Models</Link>
          <Link to="/docs" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-26 text-center ${location.pathname === '/docs' ? 'font-bold text-white' : ''}`}>Documentation</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/privacy" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-18 text-center ${location.pathname === '/privacy' ? 'font-bold text-white' : ''}`}>Privacy</Link>
              <Link to="/startup" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-18 text-center ${location.pathname === '/startup' ? 'font-bold text-white' : ''}`}>Startups?</Link>
            </>
          ) : (
            <>
              <Link to="/playground" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-22 text-center ${location.pathname === '/playground' ? 'font-bold text-white' : ''}`}>Playground</Link>
              <Link to="/settings" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-18 text-center ${location.pathname === '/settings' ? 'font-bold text-white' : ''}`}>Settings</Link>
            </>
          )}
        </div>

        {/* Right */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          {!isLoggedIn ? (
            isMobile ? (
              <Popover open={isGetStartedPopoverOpen} onOpenChange={setIsGetStartedPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="main">
                    Get Started
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 bg-neutral-950 text-white border-neutral-900" align="end" side="bottom">
                  <div className="grid gap-0">
                    <div className="pb-2 mb-2 border-b border-neutral-800">
                      <Link to="/pricing" className="block w-full text-left" onClick={() => setIsGetStartedPopoverOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start hover:bg-accent text-foreground ${location.pathname === '/pricing' ? 'font-bold text-white' : ''}`}>
                          Models
                        </Button>
                      </Link>
                      <Link to="/docs" className="block w-full text-left" onClick={() => setIsGetStartedPopoverOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start hover:bg-accent text-foreground ${location.pathname === '/docs' ? 'font-bold text-white' : ''}`}>
                          Documentation
                        </Button>
                      </Link>
                      <Link to="/privacy" className="block w-full text-left" onClick={() => setIsGetStartedPopoverOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start hover:bg-accent text-foreground ${location.pathname === '/privacy' ? 'font-bold text-white' : ''}`}>
                          Privacy
                        </Button>
                      </Link>
                      <Link to="/startup" className="block w-full text-left" onClick={() => setIsGetStartedPopoverOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start hover:bg-accent text-foreground ${location.pathname === '/startup' ? 'font-bold text-white' : ''}`}>
                          Startups?
                        </Button>
                      </Link>
                    </div>
                    <Link to="/signin" className="block w-full text-left" onClick={() => setIsGetStartedPopoverOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" className="block w-full text-left" onClick={() => setIsGetStartedPopoverOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link to="/signup">
                <Button variant="main">Get Started</Button>
              </Link>
            )
          ) : (
            <UserMenu isLoggedIn={isLoggedIn} onLogout={() => { logout(); navigate('/signin'); }} />
          )}
        </div>
      </div>
    </footer>
  );
}

export function App() {
  const navigate = useNavigate();
  useDocumentTitle();

  return (
    <AuthProvider>
      <AppContent navigate={navigate} />
    </AuthProvider>
  );
}

function AppContent({ navigate }: { navigate: (path: string) => void }) {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="h-screen flex flex-col bg-background">
      <main className="flex-1 pb-24">
        <Routes>
          <Route path="/" element={
            isLoggedIn ? (
              <div className="h-full -mb-48"><DashboardPage /></div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <h1 className="text-3xl font-bold gradient-text">Welcome</h1>
              </div>
            )
          } />
          <Route path="/pricing" element={<div className="h-full -mb-48"><PricingPage /></div>} />
          <Route path="/privacy" element={<div className="h-full -mb-48"><PrivacyPage /></div>} />
          <Route path="/startup" element={<div className="h-full -mb-48"><StartupPage /></div>} />
           <Route path="/signin" element={<div className="h-full -mb-48"><SignInPage /></div>} />
           <Route path="/signup" element={<div className="h-full -mb-48"><SignUpPage /></div>} />
           <Route path="/docs" element={<div className="h-full -mb-48"><DocsPage /></div>} />
           <Route path="/playground" element={
             <ProtectedRoute>
               <div className="h-full -mb-48"><PlaygroundPage /></div>
             </ProtectedRoute>
           } />
           <Route path="/dashboard" element={
             <ProtectedRoute>
               <div className="h-full -mb-48"><DashboardPage /></div>
             </ProtectedRoute>
           } />
           <Route path="/settings" element={
             <ProtectedRoute>
               <div className="h-full -mb-48"><SettingsPage /></div>
             </ProtectedRoute>
           } />
          <Route path="/404" element={<div className="h-full -mb-48"><NotFoundPage /></div>} />
          <Route path="*" element={<div className="h-full -mb-48"><NotFoundPage /></div>} />
        </Routes>
      </main>
      <Footer isLoggedIn={isLoggedIn} logout={logout} navigate={navigate} />
    </div>
  );
}

export default App;