import { Copy, Check } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant="secondary"
      size="icon-sm"
      className="absolute top-3 right-3 h-8 w-8 p-2 transition-all duration-200 ease-in-out flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
      onClick={handleCopy}
    >
      <Copy className={`h-3 w-3 transition-opacity duration-200 ${copied ? 'opacity-0' : 'opacity-100'}`} />
      <Check className={`h-3 w-3 transition-opacity duration-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${copied ? 'opacity-100' : 'opacity-0'}`} />
    </Button>
  );
}