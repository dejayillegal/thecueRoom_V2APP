import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import FeatureGrid from '@/components/landing/FeatureGrid';
import FeedPreview from '@/components/landing/FeedPreview';
import HowItWorks from '@/components/landing/HowItWorks';
import CtaBand from '@/components/landing/CtaBand';
import Footer from '@/components/landing/Footer';
import './_styles.css';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:grid md:grid-cols-2 md:gap-8">
          <FeedPreview />
          <HowItWorks />
        </div>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
