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
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div>
            <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">
              crofAI
            </Link>
          </div>
          
          {/* Center */}
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="text-sm hover:text-primary transition-colors">Models</Link>
            <Link to="/privacy" className="text-sm hover:text-primary transition-colors">Privacy</Link>
            <Link to="/startup" className="text-sm hover:text-primary transition-colors">Startup</Link>
          </div>
          
          {/* Right */}
          <div>
            <UserMenu />
          </div>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <div className="h-full flex items-center justify-center">
              <h1 className="text-3xl font-bold">Welcome</h1>
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