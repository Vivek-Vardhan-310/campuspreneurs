import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { TeamSection } from "@/components/home/TeamSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <TeamSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
