import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WhyUs from "@/components/sections/WhyUs";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: { canonical: "https://ritualrpo.ru" },
  openGraph: { url: "https://ritualrpo.ru" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
