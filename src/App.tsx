import { Routes, Route, Link } from "react-router-dom";
import { UserMenu } from "@/components/UserMenu";
import { PricingPage } from "@/pages/PricingPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { StartupPage } from "@/pages/StartupPage";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { PlaygroundPage } from "@/pages/PlaygroundPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div>
            <Link to="/" className="text-lg font-semibold gradient-text">
              crofAI
            </Link>
          </div>
          
          {/* Center */}
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Models</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/startup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Startup</Link>
          </div>
          
          {/* Right */}
          <div>
            <UserMenu />
          </div>
        {/* Center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
          <Link to="/pricing" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-18 text-center ${location.pathname === '/pricing' ? 'font-bold text-white' : ''}`}>Models</Link>
          <Link to="/docs" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-26 text-center ${location.pathname === '/docs' ? 'font-bold text-white' : ''}`}>Documentation</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/privacy" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-18 text-center ${location.pathname === '/privacy' ? 'font-bold text-white' : ''}`}>Privacy</Link>
              <Link to="/startup" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-18 text-center ${location.pathname === '/startup' ? 'font-bold text-white' : ''}`}>For Startups</Link>
            </>
          ) : (
            <>
              <Link to="/playground" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-22 text-center ${location.pathname === '/playground' ? 'font-bold text-white' : ''}`}>Playground</Link>
              <Link to="/dashboard" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-22 text-center ${location.pathname === '/dashboard' ? 'font-bold text-white' : ''}`}>Dashboard</Link>
              <Link to="/settings" className={`text-sm text-muted-foreground hover:text-foreground transition-colors w-18 text-center ${location.pathname === '/settings' ? 'font-bold text-white' : ''}`}>Settings</Link>
            </>
          )}
        </div>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <div className="h-full flex items-center justify-center">
              <h1 className="text-3xl font-bold gradient-text">Welcome</h1>
            </div>
          } />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/startup" element={<StartupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;