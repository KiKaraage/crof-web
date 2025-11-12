import { useLocation } from "react-router-dom";

const routeTitles: Record<string, string> = {
  "/": "Home | crofAI",
  "/pricing": "Models | crofAI", 
  "/privacy": "Privacy | crofAI",
  "/startup": "For Startups | crofAI",
  "/signin": "Sign In | crofAI",
  "/signup": "Sign Up | crofAI",
  "/docs": "API Documentation | crofAI",
  "/playground": "Playground | crofAI",
  "/dashboard": "Dashboard | crofAI",
  "/settings": "Settings | crofAI",
  "/404": "Page Not Found | crofAI",
};

export function useDocumentTitle() {
  const location = useLocation();
  
  // Set title based on current path
  const title = routeTitles[location.pathname] || "crofAI";
  document.title = title;
}