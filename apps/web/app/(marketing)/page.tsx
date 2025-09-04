import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import './_styles.css';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
