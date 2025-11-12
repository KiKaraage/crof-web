import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export function UserMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-accent">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@user" />
            <AvatarFallback className="bg-muted text-muted-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 bg-card border-border" align="end">
        <div className="grid gap-2">
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
          <Link to="/playground" className="block w-full text-left">
            <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
              Playground
            </Button>
          </Link>
          <Link to="/dashboard" className="block w-full text-left">
            <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
              Dashboard
            </Button>
          </Link>
          <Link to="/settings" className="block w-full text-left">
            <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
              Settings
            </Button>
          </Link>
          <Link to="/404" className="block w-full text-left">
            <Button variant="ghost" className="w-full justify-start hover:bg-accent text-foreground">
              404
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}