import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/UserMenu";

export function SignInPage() {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          <p className="text-muted-foreground">Welcome back to crofAI</p>
        </div>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="text-lg font-semibold hover:text-primary transition-colors">
                crofAI
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a href="/pricing" className="text-sm hover:text-primary transition-colors">Models</a>
              <a href="/privacy" className="text-sm hover:text-primary transition-colors">Privacy</a>
              <a href="/startup" className="text-sm hover:text-primary transition-colors">Startup</a>
            </div>
            <div>
              <UserMenu />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SignInPage;