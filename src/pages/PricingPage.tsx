export function PricingPage() {
  return (
    <div className="px-8 pt-9 pb-0 h-full">
      <div className="container mx-auto max-w-4xl rounded-md h-[calc(100vh-8.5rem)] flex items-center justify-center relative">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Models</h1>
          <p className="text-muted-foreground">Choose the right AI model for your needs</p>
        </div>
        <div className="absolute inset-0 rounded-md animate-gradient-glow pointer-events-none"></div>
      </div>
    </div>
  );
}

export default PricingPage;