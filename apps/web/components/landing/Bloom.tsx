export default function Bloom() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Hero Ambient Gradients */}
      <div 
        className="absolute -top-32 -left-32 w-[800px] h-[600px] rounded-full opacity-20 blur-[120px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, #873BBF 0%, transparent 60%)',
          animationDuration: '8s'
        }}
      />
      <div 
        className="absolute top-20 right-0 w-[700px] h-[500px] rounded-full opacity-15 blur-[100px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, #D1E231 0%, transparent 70%)',
          animationDuration: '12s',
          animationDelay: '2s'
        }}
      />
      
      {/* Central Glow */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-25 blur-[90px]"
        style={{
          background: 'radial-gradient(ellipse, #D1E231 0%, #873BBF 40%, transparent 70%)'
        }}
      />
    </div>
  );
}
