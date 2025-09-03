import Image from 'next/image';
import { Button } from '../components/ui/button';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 text-center">
      <Image src="/landing.svg" alt="TheCueRoom landing hero" width={400} height={400} />
      <h1 className="text-4xl font-bold">Welcome to TheCueRoom</h1>
      <Button>Get Started</Button>
    </main>
  );
}
