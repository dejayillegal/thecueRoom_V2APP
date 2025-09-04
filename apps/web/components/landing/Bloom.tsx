export default function Bloom() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,#D1FF3D,#873BBF)] opacity-35 blur-[80px]" />
    </div>
  );
}
