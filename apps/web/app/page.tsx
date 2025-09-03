import Logo from '../components/Logo';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Logo className="w-64 h-64" />
      <h1 className="text-3xl font-bold">Welcome to thecueRoom</h1>
    </main>
  );
}
