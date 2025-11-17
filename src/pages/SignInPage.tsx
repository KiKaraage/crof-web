import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="px-8 pt-9 pb-0 h-full">
      <div className="container mx-auto max-w-4xl rounded-md h-[calc(100vh-8.5rem)] flex flex-col overflow-hidden relative">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4 gradient-text">Sign In</h1>
                <p className="text-muted-foreground">Welcome back to crofAI</p>
              </div>
                <div className="relative group">
                  <Card className="bg-black border-2 gradient-border py-10 relative z-10 rounded-2xl transition-all duration-300">
                   <CardContent className="px-8">
                  <form className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" required />
                    </div>
                    <Button type="submit" className="w-full" variant="default">Sign In</Button>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">
                        Sign Up
                      </Link>
                    </p>
                  </form>
                   </CardContent>
                 </Card>
               </div>
               <div className="w-full flex justify-center mt-6">
                 <Button onClick={() => { 
                  console.log('Bypass button clicked'); 
                  localStorage.setItem('isLoggedIn', 'true');
                  login(); 
                  navigate('/dashboard'); 
                }} variant="default">
                  Bypass
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SignInPage;