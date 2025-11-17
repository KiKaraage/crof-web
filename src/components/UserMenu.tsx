import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export function UserMenu({ isLoggedIn, onLogout }: { isLoggedIn: boolean; onLogout: () => void }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Popover>
       <PopoverTrigger asChild>
         <Button variant="ghost" className="relative flex items-center gap-2 h-auto px-3 py-2 rounded-full hover:bg-accent">
           <span className="text-sm font-medium">User</span>
           <Avatar className="h-8 w-8">
             <AvatarImage src="/avatars/01.png" alt="@user" />
             <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
               <User className="h-4 w-4" />
             </AvatarFallback>
           </Avatar>
         </Button>
       </PopoverTrigger>
        <PopoverContent className="w-56 bg-neutral-950 text-white border-neutral-900" align="end">
          <div className="grid gap-0">
           {!isLoggedIn ? (
             <>
               <Link to="/signin" className="block w-full text-left">
                 <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
                   Sign In
                 </Button>
               </Link>
               <Link to="/signup" className="block w-full text-left">
                 <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
                   Sign Up
                 </Button>
               </Link>
             </>
             ) : (
               <>
                 {isMobile && (
                   <>
                     <div className="pb-2 mb-2 border-b border-neutral-800">
                       <Link to="/pricing" className="block w-full text-left">
                         <Button variant="ghost" className={`w-full justify-start hover:bg-accent text-foreground ${location.pathname === '/pricing' ? 'font-bold text-white' : ''}`}>
                           Models
                         </Button>
                       </Link>
                       <Link to="/docs" className="block w-full text-left">
                         <Button variant="ghost" className={`w-full justify-start hover:bg-accent text-foreground ${location.pathname === '/docs' ? 'font-bold text-white' : ''}`}>
                           Documentation
                         </Button>
                       </Link>
                       <Link to="/playground" className="block w-full text-left">
                         <Button variant="ghost" className={`w-full justify-start hover:bg-accent text-foreground ${location.pathname === '/playground' ? 'font-bold text-white' : ''}`}>
                           Playground
                         </Button>
                       </Link>
                       <Link to="/settings" className="block w-full text-left">
                         <Button variant="ghost" className={`w-full justify-start hover:bg-accent text-foreground ${location.pathname === '/settings' ? 'font-bold text-white' : ''}`}>
                           Settings
                         </Button>
                       </Link>
                     </div>
                   </>
                 )}
                 <Link to="/startup" className="block w-full text-left">
                   <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
                     Startups?
                   </Button>
                 </Link>
                 <Link to="/privacy" className="block w-full text-left">
                   <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
                     Privacy Policy
                   </Button>
                 </Link>
                 <Link to="/404" className="block w-full text-left">
                   <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
                     404 Page
                   </Button>
                 </Link>
                 <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground" onClick={onLogout}>
                   Log Out
                 </Button>
               </>
             )}
         </div>
       </PopoverContent>
    </Popover>
  );
}