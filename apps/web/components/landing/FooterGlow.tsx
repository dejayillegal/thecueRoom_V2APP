export default function FooterGlow() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[500px] -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Footer Ambient Glow */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1000px] h-[400px] rounded-full opacity-15 blur-[150px] animate-pulse"
        style={{
          background: 'radial-gradient(ellipse, #873BBF 0%, transparent 70%)',
          animationDuration: '10s'
        }}
      />
    </div>
  );
}